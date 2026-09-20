import user_Service from "./user.service.js";

const getMe = async(req, res, next) => {
    try {

        const user = await user_Service.getMe(req.user.id);

        return res.status(200).json({
            success: true,
            data: user // user token {id...}
        })

    } catch (err) {
        console.log(err.message)
        next(err)
        
    }

}

export default getMe;