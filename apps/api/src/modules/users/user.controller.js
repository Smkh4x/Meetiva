import user_Service from "./user.service";

const getMe = async(req, res, next) => {
    try {
        const user = await user_Service.getMe(req.user.id);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        console.log({
            err: error.message 
        })
        next()
        
    }

}

export default getMe;