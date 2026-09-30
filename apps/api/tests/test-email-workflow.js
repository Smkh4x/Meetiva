import auth_Service from "../src/modules/auth/auth.service.js";

import "dotenv/config"

try {
    await auth_Service.sendVerificationCode({
        email: "youssefalmouna8@gmail.com"

    }); 
    console.log("send req in email");

} catch (err) {
    console.log(err.message)
    
}