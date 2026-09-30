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
}
export default new endpoints()
