import { app } from 'electron';
import path from 'node:path';
import Database from 'better-sqlite3';

class AppDatabase{
    constructor(){
        // ~/.config/electron/WhalesData.sqlite
        const dbPath = path.join(app.getPath('userData'), 'WhalesData.sqlite');
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.setUpDataBase();
    }

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
}

export default AppDatabase;