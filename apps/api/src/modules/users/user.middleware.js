import jwt from "jsonwebtoken";

const user_validator = async (req, res, next) => {
    try {

        const auth_header = req.Headers.authorization; // auth_header

        if(!auth_header) return { // if not tokne return false and messsage Authorization required
            success: false ,
            message: "Authorization required"
        }

        const verify_token = jwt.verify(
            auth_header,
            process.env.JWT_SEC
        )

        const user_id = verify_token;

        console.log("user information after login in the app :", user_id)

        next()
 // return pyload verifyd

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

        
    }




    

}
export default user_validator

// req = {
//     headers: {
//         authorization: "Bearer eyJhbGciOi..."
//     }
// }

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