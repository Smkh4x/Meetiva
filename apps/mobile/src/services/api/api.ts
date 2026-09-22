import 'dotenv/config';


const API= process.env.PUBLIC_API_URL || process.env.PRIVATE_API_URL;
console.log(API);