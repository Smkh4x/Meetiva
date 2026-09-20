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
    await Sender_Email.sendMail({
        from: env.email,
        to: email,
        subject: "Meetiva verification code",
        text: `your verfivication code`,
        html: `

    <div style="background-color: #f4f4f4; padding: 30px; font-family: sans-serif; justify-items: center;">

      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

        <h1 style="color: #333333; font-size: 24px; margin-bottom: 10px;">Welcome to Our Service!</h1>

        <p style="color: #1098DF; font-size: 20px; line-height: 1.5; ">${code}</p>

      </div>

    </div>
        
        `
    });
    console.log("thiss code : ", code)
}
export default email_service