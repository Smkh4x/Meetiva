import dotenv from 'dotenv';

dotenv.config()

const env = {
  databaseUrl: process.env.DATABASE_URL,
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SEC,
  email: process.env.EMAIL_EMAIL,
  password: process.env.EMAIL_PASSWORD
}

export default env