import Users from "../users/user.model";
import OTP_code from "./email_service";


const auth_Service = {

    sendVerificationCode: async (user_req_body) => {
        const code = await OTP_code(user_req_body.email);
        
    },

    register: async (user_req_body) => {
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