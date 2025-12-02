import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dbModule from './src/db.js';
import createApp from './src/app.js';

const { initDB } = dbModule;

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, 'data', 'database.sqlite');

(async () => {
    try {
        const db = await initDB(DB_FILE);
        const app = createApp(db);
        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
})();