import auth_Service from "../src/modules/auth/auth.service.js";
import "dotenv/config";

auth_Service.login({
    email: "youssefalmouna9@gmail.com",
    password: "12345678"
    
})
console.log("login success.")


    // email: "youssefalmouna9@gmail.com",
    // userName: "youssef_1234",
    // age: "19",
    // password: "12345678",
    // user_interests: ["1","3"],