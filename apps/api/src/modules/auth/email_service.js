import nodemailer from "nodemailer";
import env from "../../config/env.js";

const email_service = async(email, code) => {
    console.log(email, code)
    const Sender_Email = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: env.email,
            pass: env.password
        }
    })
    const result = await Sender_Email.sendMail({
        from: env.email,
        to: email,
        subject: "Meetiva verification code",
        text: `your verfivication code`,
        html: `

        <h1>Subject: Your Meeiva verification code</h1>

        <h2>Your verification code is: ${code}</h2>

        <h4>This code expires in 5 minutes.

        If you didn't request this code, you can ignore this email.</h4>
        
        `
    });
    console.log("thiss code : ", code);
    return result;
}
export default email_service