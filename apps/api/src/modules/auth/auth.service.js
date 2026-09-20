import bcrypt from 'bcrypt'
import OTP_code from "../../utils/otp_code.js";
import Users from "../users/user.model.js";
import email_service from "./email_service.js";
import EmailVerifications from "./emailVerification.model.js";
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize';


const auth_Service = {

    sendVerificationCode: async (email) => {

        console.log(email)
        
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

            console.log("generated success : ",generated_code);

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

        } catch (err) {
            next(err)
            
        }
    },

    register: async (register_req_body) => {

        try {

             console.log("data : ", register_req_body);

        console.log("ana step 1")


        const user_existing = await Users.findOne({
            where: {
                [Op.or]: [
                    {email: register_req_body.email},
                    {userName: register_req_body.userName}
                ]
            }
        })

        if(user_existing) {

            if(user_existing.email === register_req_body.email) {
                throw new Error("Email already exists")
            };

            if(user_existing.userName === register_req_body.userName) {
                throw new Error("Username already exists")
            };

        };

        console.log("ana step 2")

        if(!register_req_body.age || !register_req_body.password){

            return {
                success: false,
                message: "please full the input"
            }

        }

        console.log("step 3")

        const pass_Hash = await bcrypt.hash(register_req_body.password, 10);

        console.log("step 4 pass:", pass_Hash)

        const new_User = await Users.create({
            email: register_req_body.email,
            userName: register_req_body.userName,
            age: register_req_body.age,
            password: pass_Hash,
            user_interests: register_req_body.user_interests,
        })

        console.log("user created :", new_User)

        const auth_Token = jwt.sign({
            id: new_User.id
        },
            process.env.JWT_SEC,
        {
            expiresIn: process.env.JWT_EXP,
        })

        console.log("Token : ", auth_Token);

        return auth_Token

        } catch (err) {
            console.log(err.message)
            
        }

        
    },

    login: async (login_req_body) => { // userName or email || password
        try {
            console.log("your information: ", login_req_body);

            const user_existing = await Users.findOne({
                where: {
                    [Op.or]: [
                        {email: login_req_body.email} || {userName: login_req_body.userName}
                    ]
                }
            })

            console.log("step 1")
            
            if(!user_existing){
                if(user_existing.email !== login_req_body.email || user_existing.userName !== login_req_body.userName){
                    return {
                        success: false,
                        message: "Email or username is not correct"
                    }
                }
            }

            console.log("step 2")

            const isTrue = await bcrypt.compare(login_req_body.password, user_existing.password);

            console.log("password: ", isTrue)

            const user_Token = jwt.sign(
                {
                    id: user_existing.id
                },
                process.env.JWT_SEC,
                {
                    expiresIn: process.env.JWT_EXP
                }
    
            )
            console.log(user_Token);

            return user_Token;

        } catch (err) {
            console.log(err.message)
            
        }


        
    }

}
export default auth_Service;
//REFRESH_TOKEN