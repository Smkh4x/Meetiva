import user_Service from "../src/modules/users/user.service.js";
import "dotenv/config";

try {
    user_Service.getMe({
        id: 2
    })    
} catch (err) {

    console.log(err.message)
    
}
console.log("token send success")



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzg5OTEyOTcxLCJleHAiOjE3OTI1MDQ5NzF9.pEbERPJvXPSrgqpY5Fo48PMxUVhbjh5Q4OAT7kXa-AU