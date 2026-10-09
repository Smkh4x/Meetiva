import jwt from "jsonwebtoken";
import env from "../../config/env.js";

const user_validator = async (req, res, next) => {
        const auth_header = req.headers.authorization // auth_header
        // console.log("=> ",auth_header)
            if(!auth_header) return { // if not tokne return false and messsage Authorization required
                success: false ,
                message: "Authorization required"
            }    
        const token = auth_header?.split(" ")[1];

    try {
        // console.log("here 1")

        const decode = jwt.verify(
            token,
            env.jwtSecret
        )

        // console.log("here 2 ===============>")

        req.user = decode; // store data token in user_id

        // console.log(req.user)
        next()
    } catch (err) {
    console.error("=> JWT ERROR:", err);

    return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
    });
}
}
export default user_validator

// "Invalid or expired token"
// "Authorization required"
// "User not found"
// "Invalid interests"
// "Email already exists"
// "Username already exists"
// "Invalid verification code"
// "Verification code has expired"
// "Invalid request data"
// "Required fields are missing"
// "Something went wrong"