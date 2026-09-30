import express from 'express';
import database from './config/database.js';
import Users from './modules/users/user.model.js';
import EmailVerification from './modules/auth/emailVerification.model.js';
import interests from './modules/interests/interest.routes.js';
import auth from './modules/auth/auth.routes.js';

const app = express();
app.use(express.json());

app.use("/api/auth", auth);
app.use("api/interests", interests)

// app.use((req, res, next) => {
//     console.log("connect :", req.method, req.url)
//     next()
// })



try {
    await database.authenticate();
    console.log('[+] => Database connection has been established successfully.');

    await database.sync();

    console.log("tables created successfully");

} catch (error) {
    console.error('[-] => Unable to connect to the database:', error.message);
}


export default app;