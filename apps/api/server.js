import app from './src/app.js';

const server = async () => {
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

}
server();