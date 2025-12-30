let io;

module.exports = {
    init: (socketIoInstance) => {
        io = socketIoInstance;
        io.on('connection', (socket) => {
            console.log('⚡ User connected to Socket:', socket.id);
        });
        return io;
    },
    getIo: () => {
        return io;
    },
    broadcastNewMessage: (message) => {
        if (io) {
            io.emit('new_message', message);
        }
    }
};