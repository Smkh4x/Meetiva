import Assosiation_User_And_Interests from "../associations/assosiation.model.js";
import Users from "./user.model.js";
import user_Service from "./user.service.js";

class user_controller {
    me = async (req, res) => {
        console.log("in controller req.user :", req.user)
        try {
            const result = await user_Service.get_me(req.user)

            return res.status(200).json({
                success: true,
                data: result
            })
            
        } catch (err) {
            console.log("controller error in :", err)   
            throw err

        }


    }

    // profile = async (req, res) => {
    //     console.log("token success and is done in controller :",req.user.id)
    //     try {
    //         const result = await Users.findByPk(req.user.id);
    //         return res.status(200).json({
    //             data: result
    //         })
    //     } catch (err) {
    //         console.log(err)
            
    //     }
    // }

}
export default new user_controller()