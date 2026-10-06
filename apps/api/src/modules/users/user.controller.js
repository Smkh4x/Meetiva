import user_Service from "./user.service.js";

class user_controller {
    me = async (req, res) => {
        console.log("in controller req.user :", req.user)
        try {
            const result = await user_Service.get_me(req.user)

            return res.status(200).json({
                success: true,
                data: result.id
            })
            
        } catch (err) {
            console.log("controller error in :", err)   
            throw err

        }


    }

}
export default new user_controller()