import http from 'http'
import { Server } from 'socket.io';
import app from './src/app.js';
import env from './src/config/env.js';
import MatchingSocket from './src/modules/matching/matching.socket.js';
import matching_auth_middelware from './src/modules/matching/middleware/matching.middleware.js';
// import MatchingService from './src/modules/matching/matching.service.js';

const server = http.createServer(app) // app server joz2 mn http server
const io = new Server(server) // seocket io joz2 mn server http

io.use(matching_auth_middelware)

const matching_Socket = new MatchingSocket(io)

// const maching_server = new MatchingService(server)

matching_Socket.register()

const server_meeiva = async () => {
    const PORT = env.port || 3000;
    try {
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message)

    }

}
server_meeiva();