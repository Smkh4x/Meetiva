import dotenv from 'dotenv';

dotenv.config()

const env = {
  databaseUrl: process.env.DATABASE_URL,
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SEC
}

export default env