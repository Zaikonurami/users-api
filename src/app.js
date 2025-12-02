import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import usersRouter from './routes/users.js';

function createApp(db) {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(json());
    app.set('db', db);

    app.get('/health', (req, res) => res.json({ ok: true }));
    app.use('/api/users', usersRouter);

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}

export default createApp;