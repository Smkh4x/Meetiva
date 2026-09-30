import Interest_user from "./interest.service.js";

const interest = async(req, res, next) => {

    try {
        const { user_interests } = req.body
        const result = await Interest_user(user_interests);
        return res.status(200).json(result) 
               
    } catch (err) {
        next(err)
        
    }


}
export default interest