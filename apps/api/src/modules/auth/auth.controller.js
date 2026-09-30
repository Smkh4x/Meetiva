import auth_Service from "./auth.service.js";


class register {

    sendVerificationCode = async (req, res) => {
        try {
            const result = await auth_Service.sendVerificationCode(req.body); // email

            return res.status(200).json({
                message: "Send code successfuly check ur email",
            });
            
        } catch (err) {
            throw err
        }

    }

    verifyCode = async (req , res) => {
        try {
            const {
                email,
                code
                } = req.body
            console.log("controller:", email, code)

            const result = await auth_Service.verifyCode(email, code);

                    console.log(result)

                if(result.success === false) {
                    return res.status(401).json({
                        message: result.message
                    })
                }
            // console.log("is read or no ? : ",result)

            return res.status(201).json({
                message: "code verfying successfully"
            });
        } catch (err) {
            throw err
            // next(err);
            
        }
    }

    register = async (req , res , next) => {
        // const { email, userName, age, password, user_interests } = req.body
            try {
                const user = await auth_Service.register(req.body);

                return res.status(201).json(user)

            } catch (err) {
                next(err)
            }        
        }
    login = async (req, res, next) => {
        try {
            const user = await auth_Service.login(req.body);
            
            return res.status(200).json(user);
            
        } catch (err) {
            console.log(err.message)
            next(err)
            
        }

    }

}

export default new register()
