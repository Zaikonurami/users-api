import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();
import { open } from 'sqlite';

async function initDB(filename) {
    const db = await open({
        filename,
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT (CURRENT_TIMESTAMP),
      updated_at DATETIME
    );
  `);

    return db;
}

export default { initDB };