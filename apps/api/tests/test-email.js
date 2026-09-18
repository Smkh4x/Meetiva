import email_service from "../src/modules/auth/email_service.js";
import "dotenv/config"
try {
    await email_service(
        "youssefalmouna8@gmail.com",
        "989898"
    )
    console.log("send success")
} catch (error) {

    console.log(error.message)
    
}
