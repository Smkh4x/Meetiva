
import auth_Service from "../src/modules/auth/auth.service.js"
import "dotenv/config"

try {
    await auth_Service.verifyCode(
        "khaliddrihem59@gmail.com",
        "931050"
    )
    
} catch (err) {
    console.log(err)
    
}
