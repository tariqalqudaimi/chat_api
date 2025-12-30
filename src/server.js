require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const socketService = require('./services/socket.service');

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true 
});


socketService.init(io);

io.on('connection', (socket) => {
    console.log('✅ Connected successfully! ID:', socket.id);
});


server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});