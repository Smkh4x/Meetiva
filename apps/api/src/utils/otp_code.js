import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import EmailVerification from '../modules/auth/emailVerification.model';

async function OTP_code (email) {

    const code = crypto.randomInt(100000, 1000000).toString();
    console.log(code);

    const code_hash = await bcrypt.hash(code, 10);

    await EmailVerification.create({
        email,
        code_hash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })
    
    return code

}
export default OTP_code


