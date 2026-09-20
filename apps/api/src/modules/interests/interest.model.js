import { DataTypes } from "sequelize";
import database from "../../config/database";


const Interest = database.define("Interests",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    interest: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    

},{
    tableName: "Interests"
})

export default Interest