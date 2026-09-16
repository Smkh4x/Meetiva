import "dotenv/config";
import sendVerificationCode from "../src/modules/auth/email_service.js";

await sendVerificationCode(
    "YOUR_EMAIL@gmail.com",
    "483921"
);

console.log("Email sent successfully");