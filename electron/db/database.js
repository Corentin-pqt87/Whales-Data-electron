import { app } from 'electron';
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
    addBase(win, baseName, baseDescription){
  
    }
    // ouvrir une base de donnée de navigateur
    openBase(){

    }
    // supprimer une base de données de navigateur
    deletBase(){

    }
    // modifier une base de données de navigateur
    updateBase(){

    }
}

export default AppDatabase;