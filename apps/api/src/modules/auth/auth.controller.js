import auth_Service from "./auth.service";


class register {

    sendVerificationCode = async (req, res , next) => {
        try {
            const { email } = req.body

            await auth_Service.sendVerificationCode(email);

            return res.status(200).json({
                message: "Send code successfuly check ur email",
            });
            
        } catch (err) {
            // console.log(err.message);
            next(err)
             
        }

    }

    verifyCode = async (req , res, next) => {
        try {
            const { email, code } = req.body

            await auth_Service.verifyCode(email, code);

            return res.status(200).json({
                message: "code verfying successfully"
            });
            
        } catch (err) {
            // console.log(err.message)
            next(err);
            
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

    }

}

export default new register()
