import api from "./api";

class endpoints {

    send_verfication_code = async (email:string) => {
        try {
            const result = await api.post("/api/auth/send-code", {email: email});
            return result;

        }catch(err:any) {            
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            throw err
        }
    }
    verifiaction_code = async (email:string, code:string) => {
        try {
            const result = await api.post("/api/auth/verifyCode", {
                email: email,
                code: code
            })
            
            return result;
            
        } catch (err:any) {
            console.log("response backend in STATUS:", err.response?.status);
            console.log("response backend in service:", err.response?.data);
            throw err
        }
    }
    verification_username = async (userName: string) => {
        try {
        const result = await api.post("/api/auth/verify-username",{userName: userName})
        return result;
            
        } catch (err: any) {
            throw err
            
        }

    }
    get_interests = async () => {
        try {
            return await api.get("/api/interests/get-interests")
            
        } catch (err) {
            throw err
            
        }
    }
    register = async (payload: object) => {
        try {
            const result = await api.post("/api/auth/register", payload);
            console.log(result.data)
            return result.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    login = async (payload: object) => {
        // console.log("services => ",payload)
        try {
            const result = await api.post("/api/auth/login", payload);
            // console.log("[+]",result.data)
            return result.data
            
        } catch (err) {
            throw err
            
        }
    }
    me = async (token?: string) => {
        try {
            const result = await api.post("/api/users/me", token)
            // console.log("me",result.data.data.data.userName)
            return result.data;
        } catch (err) {
            console.log(err)
            throw err
        }

    }
    // user_profile = async () => {
    //     try {
    //         const result = await api.get("/api/users/profile")
    //         console.log("all result of profile => ",result)
    //         return result.data
            
    //     } catch (err:any) {
    //         console.log("response =>",err.response?.data)
    //         console.log("status => ",err.status?.data)
    //         throw err
            
    //     }
    // }
}
export default new endpoints()
