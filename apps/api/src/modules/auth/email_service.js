import nodemailer from "nodemailer";
import env from "../../config/env.js";

const sendVerificationCode = async(email, code) => {
    const Sender_Email = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "youssef.dev.sec@gmail.com",
            pass: "qrcd wmcv kyld iwne"
        }
    })
    await Sender_Email.sendMail({
        from: env.email,
        to: "youssefalmouna8@gmail.com",
        subject: "Meetiva verification code",
        text: `Your verification code is ${code}`
    })
}
export default sendVerificationCode