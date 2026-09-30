import z from "zod";

const email = z.object({
    email: z.email("Please provide a valid email address")
        .trim()
        .lowercase()
})
const verifyCode = z.object({
    email: z.email("Please provide a valid email address")
        .trim()
        .lowercase(),
    code: z.string("Please enter a 6-digit number")
        .max(6)
        .min(6)
})
const register_auth = z.object({
        userName: z.string(),
        email: z.string().email(),
        age: z.number(),
        password: z.string().min(8).max(32),
        user_interests: z.array(z.number())
    
})
export {email, verifyCode, register_auth}