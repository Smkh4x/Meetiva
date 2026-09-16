import { DataTypes } from "sequelize";
import Database from "../../config/database";
import database from "../../config/database";

const Users = Database.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 18,
            max: 100
        }

    },     
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8 , 100],
                msg: "Password must be between 8 and 100 characters"
            }
        }
    },
    user_interests: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    tableName: 'Users',
    timestamps: true
})

export default Users