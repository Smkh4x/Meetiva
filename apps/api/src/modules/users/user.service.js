import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import Users from "./user.model.js";

const user_Service = {
    get_me: async(reqUser) => {
        console.log("1 => here in serveices : ",reqUser)

        const result = await Users.findByPk(reqUser.id, {
            attributes: {
                exclude: ["password"]
            }
        })

        if(!result){
            return {
                success: false,
                message: "user not found"
            }
        }
        return {
            success: true,
            message: "this is user data :",
            data: result
        }
    }
}
export default user_Service;