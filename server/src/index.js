import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env');
const dotenvResult = dotenv.config({ path: envPath });
dotenvExpand.expand(dotenvResult);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
