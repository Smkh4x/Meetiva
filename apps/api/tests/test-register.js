import auth_Service from "../src/modules/auth/auth.service.js";
import 'dotenv/config';

await auth_Service.register({
    email: "youssefalmouna9@gmail.com",
    userName: "youssef_1234",
    age: "19",
    password: "12345678",
    user_interests: ["1","3"],
})
console.log("send request successfuly")