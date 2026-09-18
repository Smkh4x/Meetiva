import database from "../../config/database.js";
import { DataTypes } from "sequelize";

const EmailVerifications = database.define("EmailVerification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    tableName: 'EmailVerification',  
})

export default EmailVerifications;