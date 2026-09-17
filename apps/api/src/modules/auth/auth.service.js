import bcrypt from 'bcrypt'
import OTP_code from "../../utils/otp_code.js";
import Users from "../users/user.model.js";
import email_service from "./email_service.js";
import EmailVerifications from "./emailVerification.model.js";
import { Op } from 'sequelize';


const auth_Service = {

    sendVerificationCode: async (email) => {
        
        try {
            const user_existing = await Users.findOne({
                where: {
                    email: email.email   
                }
            })

            if(user_existing) {
                return {
                    success: false,
                    message: "Email already exits"
                };
            }

            const generated_code = await OTP_code(email.email);

            // console.log("generated success : ",generated_code);

            await email_service(email.email, generated_code);

            // console.log('email send code :', generated_code);

        } catch (err) {
            console.log(err.message)
        }

    },

    verifyCode: async (email, code) => {

        try {
            const Verification = await EmailVerifications.findOne({
                where: {
                    email: email,
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            })
            // console.log(Verification.email, Verification.code);

            if (!Verification) {
                return {
                    success: false,
                    message: "Verification code not found"
                };
            }

            if( new Date() > Verification.expiresAt){
                return {
                    success: false,
                    message: "Verification code expired"
                }
            }

            const isTrue = await bcrypt.compare(code, Verification.code);

            if(!isTrue) {
                return {
                    success: false,
                    message: "Invalid verification code"
                }
            }

            // console.log("Email verified successfully");

            return {
                success: true,
                message: "Email verified successfully"
            };

        } catch (error) {
            
        }
    },

    register: async (user_req_body) => {

        console.log(user_req_body)

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    {email: user_req_body.email},
                    {username: user_req_body.userName}
                ]
            }
        })

        if(existing_user) {

            if(existing_user.email === user_req_body.email) {
                throw new Error("Email already exists")
            }

            if(existing_user.username === user_req_body.userName)   {
                throw new Error("Username already exists")
            }
            
        }
    },

    login: async () => {
        
    }

}
export default auth_Service;