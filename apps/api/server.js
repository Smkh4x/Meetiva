import app from './src/app.js';
import env from './src/config/env.js';


const server = async () => {
    const PORT = env.port || 3000;
    try {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message)

    }

}
server();