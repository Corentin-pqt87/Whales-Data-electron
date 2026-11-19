import { app, dialog } from 'electron';
import path from 'node:path';
import Database from 'better-sqlite3';
import { SaveFile } from './saveBase.js';

class AppDatabase{
    constructor(){
        /**
         * Linux : ~/.config/electron/WhalesData.sqlite
         * Windows : C:\Users\{USER NAME}\AppData\Roaming\electron\WhalesData.sqlite
         * macOS : /Users/{USER NAME}/Library/Application Support/electron/WhalesData.sqlite
         */
        const dbPath = path.join(app.getPath('userData'), 'WhalesData.sqlite');
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.setUpDataBase();
    }
    // init
    setUpDataBase(){
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS Base (
                id_base INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                base_name TEXT,
                base_description TEXT,
                "path" TEXT
            )
            `);

        console.log("db initialized");
    }

    // ------ methodes-----

    // ajouter une nouvelle base de données de navigateur
    async addBase(win, baseName, baseDescription){
        // boite de dialogue pour chooisir l'emplacement
        const { canceled, filePath } = await dialog.showSaveDialog(win, {
            title: 'Créer une nouvelle base de données de sauvegarde',
            defaultPath: path.join(app.getPath('documents'), `${baseName || 'sauvegarde'}.sqlite`),
            filters: [
                { name: 'Fichiers SQLite', extensions: ['sqlite', 'db'] },
                { name: 'Tous les fichiers', extensions: ['*'] }
            ]
        });

        // l'utilisateur ferme la fenetre sans ne rien avoir choisie
        if( canceled || !filePath ){
            return {
                success: false,
                message: "Création annulée par l'utilisateur"
            }
        }

        try {
            // créer le nouveau fichier de sauvegarde
            SaveFile.new(filePath, { overwrite: true });

            // enregistrer le fichier de sauvegarde dans la base de donnée principale
            const stmt = this.db.prepare(`
                INSERT INTO Base (base_name, base_description, "path") VALUES (?, ?, ?)
            `);
            const info = stmt.run(baseName, baseDescription, filePath);

            return {
                success: true,
                id_base: info.lastInsertRowid,
                path: filePath
            };
        } catch (error){
            console.error("Erreur lors de la création du fichier de sauvegarde :", error);
            return { success: false, error: error.message };
        }
    }

    // ouvrir une base de donnée de navigateur
    async openBase(win, baseName, baseDescription) {
        // 1. boîte de dialogue "Ouvrir" (≠ "Enregistrer")
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            title: 'Ouvrir une base de données de sauvegarde',
            properties: ['openFile'],
            filters: [
                { name: 'Fichiers SQLite', extensions: ['sqlite', 'db'] },
                { name: 'Tous les fichiers', extensions: ['*'] }
            ]
        });

        if (canceled || filePaths.length === 0) {
            return { success: false, message: "Ouverture annulée par l'utilisateur" };
        }

        const filePath = filePaths[0];

        try {
            const save = new SaveFile(filePath);
            save.open({ readonly: true });

            const hasSchema = save.db
                .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='File'`)
                .get();

            save.close();

            if (!hasSchema) {
                return {
                    success: false,
                    error: "Le fichier sélectionné n'est pas une sauvegarde valide"
                };
            }

            // est il en mémoir dans AppDatabase
            const existing = this.db
                .prepare(`SELECT * FROM Base WHERE "path" = ?`)
                .get(filePath);

            if (existing) {
                return { success: true, alreadyRegistered: true, ...existing };
            }

            // si on ne le connait pas on l'ajoute
            const info = this.db.prepare(`
                INSERT INTO Base (base_name, base_description, "path") VALUES (?, ?, ?)
            `).run(
                baseName || path.basename(filePath, path.extname(filePath)),
                baseDescription || null,
                filePath
            );

            return {
                success: true,
                id_base: info.lastInsertRowid,
                base_name: baseName,
                base_description: baseDescription,
                path: filePath
            };
        } catch (error) {
            console.error("Erreur lors de l'ouverture de la sauvegarde :", error);
            return { success: false, error: error.message };
        }
    }

    // supprimer une base de données de navigateur
    deletBase(){

    }

    // modifier une base de données de navigateur
    updateBase(){

    }
    // ouvrir une instance de base de donnée de sauvegarde
    openBaseInstance(filePath) {
        if (!this.currentSave || this.currentSave.dbPath !== filePath) {
            this.currentSave?.close();
            this.currentSave = new SaveFile(filePath).open();
        }
        return this.currentSave;
    }
}

export default AppDatabase;