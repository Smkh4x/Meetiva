import dotenv from 'dotenv';
import path from 'node:path'
import { fileURLToPath } from 'node:url';


const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

dotenv.config({
  path: path.resolve(dirName, "../../.env")
});

const env = {

  databaseUrl: process.env.DATABASE_URL,

  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SEC,

  email: process.env.EMAIL_EMAIL,
  password: process.env.EMAIL_PASSWORD
}

export default env
