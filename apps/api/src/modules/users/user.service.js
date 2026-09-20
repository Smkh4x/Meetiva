import Users from "./user.model.js";

const user_Service = {

    getMe: async (me_req_body) => {
        try {
            console.log("ID", me_req_body)

        const user = await Users.findByPk(me_req_body.id, {
            attributes: {
                exclude: ["password"]
            }
        });// id in parametre

        if(!user){
            throw new Error("User not found");
        } 

        console.log("step success")
        console.log({
            message: "user:",
            user
        })
        return user;
            
        } catch (err) {
            console.log(err.message)
            
        }


     
    }

}
export default user_Service;