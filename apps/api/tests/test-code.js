
import auth_Service from "../src/modules/auth/auth.service.js"
import "dotenv/config"

try {
    await auth_Service.verifyCode(
        "hitorikaizo@gmail.com",
        "750993"
    )
    
} catch (err) {
    console.log(err)
    
}
