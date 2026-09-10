import sequelize from 'sequelize';
import env from './env.js';

const database = new sequelize.Sequelize(
  env.databaseUrl,
  {
    dialect: "postgres",
    logging: false
  }
);

export default database;