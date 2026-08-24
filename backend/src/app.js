import express from 'express';
import database from './config/database.js';

const app = express();
app.use(express.json());

try {
    await database.authenticate();
    console.log('[+] => Database connection has been established successfully.');
} catch (error) {
    console.error('[-] => Unable to connect to the database:', error);
}


export default app;