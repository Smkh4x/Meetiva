import sequelize from 'sequelize';
import env from './env.js';
// this is connection to the database using sequelize
const database = new sequelize.Sequelize(
    env.db.name,
    env.db.username,
    env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: 'postgres',
    logging: false, // Disable logging for cleaner output
  }     
);

export default database;