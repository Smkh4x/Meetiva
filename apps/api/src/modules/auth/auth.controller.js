import auth_Service from "./auth.service";


export const register = async (req , res , next) => {
    const { id, email, userName, age, password, user_interests } = req.body

        try {
            const user = await auth_Service.register(req.body);
        } catch (error) {
            
        }        
    }
