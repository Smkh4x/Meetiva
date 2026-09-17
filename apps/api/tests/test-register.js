import auth_Service from "../src/modules/auth/auth.service.js";
import 'dotenv/config';

await auth_Service.register({
    email: "youssefalmouna8@gmail.com",
    userName: "youssef_123",
    age: "19",
    password: "12345678",
    email: "user_interests",
})
console.log("sen request successfuly")