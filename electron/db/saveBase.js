import path from 'node:path';
import fs from 'node:fs';
import Database from 'better-sqlite3';

// model d'un base de données de fichier de sauvegarde
const SCHEMA = `
CREATE TABLE IF NOT EXISTS Author (
    id_author INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE IF NOT EXISTS Tag (
    id_tag INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tag_name TEXT
);

CREATE TABLE IF NOT EXISTS "File" (
    id_file INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT,
    "type" TEXT
);

CREATE TABLE IF NOT EXISTS Link (
    id_link INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    link_name TEXT,
    link TEXT
);

CREATE TABLE IF NOT EXISTS Signet (
    id_signet INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    signet_name TEXT,
    parent_id INTEGER,
    CONSTRAINT Signet_Signet_FK FOREIGN KEY (parent_id) REFERENCES Signet(id_signet)
);

CREATE TABLE IF NOT EXISTS File_autor (
    id_file_author INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_file INTEGER,
    id_author INTEGER,
    CONSTRAINT File_autor_File_FK FOREIGN KEY (id_file) REFERENCES "File"(id_file),
    CONSTRAINT File_autor_Author_FK FOREIGN KEY (id_author) REFERENCES Author(id_author)
);

CREATE TABLE IF NOT EXISTS File_tag (
    id_file_tag INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_file INTEGER,
    id_tag INTEGER,
    CONSTRAINT File_tag_File_FK FOREIGN KEY (id_file) REFERENCES "File"(id_file),
    CONSTRAINT File_tag_Tag_FK FOREIGN KEY (id_tag) REFERENCES Tag(id_tag)
);

CREATE TABLE IF NOT EXISTS File_link (
    id_file_link INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_file INTEGER,
    id_link INTEGER,
    CONSTRAINT File_link_File_FK FOREIGN KEY (id_file) REFERENCES "File"(id_file),
    CONSTRAINT File_link_Link_FK FOREIGN KEY (id_link) REFERENCES Link(id_link)
);

CREATE TABLE IF NOT EXISTS Author_link (
    id_author_link INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_author INTEGER,
    id_link INTEGER,
    CONSTRAINT Author_link_Author_FK FOREIGN KEY (id_author) REFERENCES Author(id_author),
    CONSTRAINT Author_link_Link_FK FOREIGN KEY (id_link) REFERENCES Link(id_link)
);

CREATE TABLE IF NOT EXISTS Signet_file (
    id_signet_file INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_signet INTEGER,
    id_file INTEGER,
    CONSTRAINT Signet_file_Signet_FK FOREIGN KEY (id_signet) REFERENCES Signet(id_signet),
    CONSTRAINT Signet_file_File_FK FOREIGN KEY (id_file) REFERENCES "File"(id_file)
);
`;

export class SaveFile {
    // init
    constructor(dbPath){
        this.dbPath = dbPath;
        this.db = null;
    }

    // ------ methodes-----

    // créer un nouveau fichier de sauvegarde
    static new(filePath, options = {}){
        const { overwrite = false } = options;

        // créer un dossier parent (si il y en a un dans le chemain)
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        // si le fichier existe déjà
        if (fs.existsSync(filePath)) {
            if (!overwrite) {
                throw new Error(`Le fichier existe déjà : ${filePath}`);
            }
            fs.unlinkSync(filePath);
        }

        // tout est OK
        const instance = new SaveFile(filePath);
        instance.open({ create: true });
        instance.initSchema();
        instance.close();
        return instance;
    }

    // ouvrir une sauvegarde (uniquement 1)
    open({ readonly = false, create = false } = {}){
        if( this.db ) return this;

        if( !create && !fs.existsSync(this.dbPath) ){
            throw new Error(`Fichier de sauvegarde introuvable : ${this.dbPath}`);
        }
        this.db = new Database(this.dbPath, { readonly });
        this.db.pragma('foreign_keys = ON');
        return this;
    }

    // ajouter les tables dans le fichier de sauvegarde
    initSchema(){
        // la base est elle ouverte ?
        if (!this.db) throw new Error('Base non ouverte');

        this.db.exec(SCHEMA);
    }

    // fermer le fichier de sauvegarde
    close(){
        if( this.db ){
            this.db.close();
            this.db = null;
        }
    }


    // -------------------------------------------------------
    //          les methodes spécifique au sauvegarde
    // -------------------------------------------------------

    // ajouter un fichier
    addFile(filePath, type){
        const file = this.db.prepare(
            `INSERT INTO "File" ("path", "type") VALUES (?, ?)`
        );
        return file.run(filePath, type).lastInsertRowid;
    }

    // ajouter un auteur
    addAuthor(name){
        return this.db
            .prepare(`INSERT INTO Author (name) VALUES (?)`)
            .run(name).lastInsertRowid;
    }

    // ajouter un tag
    addTag(tagName){
        return this.db
            .prepare(`INSERT INTO Tag (tag_name) VALUES (?)`)
            .run(tagName).lastInsertRowid;
    }

    // Ajouter un lien
    addLink(name, url){
        return this.db
            .prepare(`INSERT INTO Link (link_name, link) VALUES (?, ?)`)
            .run(name, url).lastInsertRowid;
    }

    // lier un autheur a un fichier
    linkFileAuthor(idFile, idAuthor){
        return this.db
            .prepare(`INSERT INTO File_autor (id_file, id_author) VALUES (?, ?)`)
            .run(idFile, idAuthor).lastInsertRowid;
    }

    // lier un fichier a un tag
    linkFileTag(idFile, idTag){
        return this.db
            .prepare(`INSERT INTO File_tag (id_file, id_tag) VALUES (?, ?)`)
            .run(idFile, idTag).lastInsertRowid;
    }



    // grouper les insertions
    transaction(fn){
        return this.db.transaction(fn)();
    }
}