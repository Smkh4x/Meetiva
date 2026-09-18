import { DataTypes } from "sequelize";
import database from "../../config/database";


const Interest = database.define("Interests",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false

    }
    

})