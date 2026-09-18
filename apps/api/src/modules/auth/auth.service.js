import bcrypt from 'bcrypt'
import OTP_code from "../../utils/otp_code.js";
import Users from "../users/user.model.js";
import email_service from "./email_service.js";
import EmailVerifications from "./emailVerification.model.js";
import { Op } from 'sequelize';
import { sign } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'


const auth_Service = {

    sendVerificationCode: async (email) => {
        
        try {
            const user_Existing = await Users.findOne({
                where: {
                    email: email.email   
                }
            })

            if(user_Existing) {
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
            const user_Verification = await EmailVerifications.findOne({
                where: {
                    email: email,
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            })
            // console.log(Verification.email, Verification.code);

            if (!user_Verification) {
                return {
                    success: false,
                    message: "Verification code not found"
                };
            }

            if( new Date() > user_Verification.expiresAt){
                return {
                    success: false,
                    message: "Verification code expired"
                }
            }

            const isTrue = await bcrypt.compare(code, user_Verification.code);

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

    register: async (register_req_body) => {

        console.log("data : ", register_req_body);

        console.log(register_req_body)

        const user_existing = await Users.findOne({
            where: {
                [Op.or]: [
                    {email: register_req_body.email},
                    {username: register_req_body.userName}
                ]
            }
        })

        if(user) {

            if(user_existing.email === register_req_body.email) {
                throw new Error("Email already exists")
            };

            if(user_existing.userName === register_req_body.userName) {
                throw new Error("Username already exists")
            };

            return { success: false }
        };

        if(!register_req_body.age || !register_req_body.password || !register_req_body.user_interests){

            return {
                success: false,
                message: "please full the input"
            }

        }
        const pass_Hash = await bcrypt.hash(register_req_body.password, 10);

        const new_User = await Users.create({
            email: register_req_body.email,
            userName: register_req_body.userName,
            age: register_req_body.age,
            password: pass_Hash,
            user_interests: register_req_body.user_interests,
        })

        const auth_Token = jwt.sign({
            id: new_User.id
        },
            process.env.JWT_SEC,
        {
            expiresIn: process.env.JWT_EXP,
        })

        console.log("Token : ", auth_Token);

        return auth_Token

    },

    login: async (login_req_body) => {
        
    }

}
export default auth_Service;