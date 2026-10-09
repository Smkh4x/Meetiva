import { DataTypes } from "sequelize";
import database from "../../config/database.js";
import Users from "../users/user.model.js";
import Interest from "../interests/interest.model.js";


const Assosiation_User_And_Interests = database.define("assosiation_User_And_Interests", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }

    },
    interestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Interest,
            key: "id"
        }

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