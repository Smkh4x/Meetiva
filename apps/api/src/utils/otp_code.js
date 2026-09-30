import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import EmailVerification from '../modules/auth/emailVerification.model.js';

async function OTP_code (email) {

    const code = crypto.randomInt(100000, 1000000).toString();

    console.log("random num :", code);

    const code_hash = await bcrypt.hash(code, 10);

    const result = await EmailVerification.create({
        email: email,
        code: code_hash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    }) // up email , code_hash in db

    console.log("save successfuly in databse :" , {
        email: email,
        code: code_hash,
    })
    
    return code; 
    // return code 6 digit , because user code to send the client code

}
export default OTP_code


