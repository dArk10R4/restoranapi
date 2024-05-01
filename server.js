const dotenv = require('dotenv').config({
    path: './config/.env'
});
const http = require('http');
const mongoose = require('mongoose');


main().catch((err) => console.log(err));

async function main() {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log('Connected to MongoDB');
}


const app = require('./src/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on port ${port}`));