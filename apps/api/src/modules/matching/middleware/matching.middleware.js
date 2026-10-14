import jwt from 'jsonwebtoken'
import env from '../../../config/env.js'

function matching_auth_middelware(socket, next) {
    try {
        const token = socket.handshake.auth.token

        if(!token){
            return {
                success: false,
                message: "token not found"
            }
        }
        const decode = jwt.verify(
            token,
            env.jwtSecret
        )
        
        socket.userId = decode.id

        console.log("middelware => ",socket.userId)

        next()      
    } catch (err) {
        
    }

}
export default matching_auth_middelware;