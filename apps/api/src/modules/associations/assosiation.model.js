import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import database from "../../config/database";
import { tr } from "zod/locales";

const Assosiation_User_And_Interests = database.define("assosiation_User_And_Interests", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    interestId: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
}, {
    tableName: "assosiation_User_And_Interests",
    timestamps: true,

    indexes: [
        {
            unique: true,
            fields: ["userId", "interestId"],
        }
    ]
},)
export default Assosiation_User_And_Interests;