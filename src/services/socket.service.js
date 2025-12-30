/**
 * خدمة إدارة الاتصال الفوري (Socket Service).
 * 
 * وظيفة هذا الملف هي تغليف مكتبة Socket.io لتسهيل استخدامها:
 * - init: تهيئة السوكيت والسماح للمستخدمين بالانضمام لغرف خاصة (Rooms) بناءً على معرفاتهم.
 * - sendToUser: إرسال رسالة خاصة لمستخدم محدد فقط (Private Message).
 * - broadcastMessageUpdate: بث حدث عند تعديل رسالة ليتم تحديثها في واجهة الطرف الآخر.
 */

let io;

module.exports = {
    init: (socketIoInstance) => {
        io = socketIoInstance;
        io.on('connection', (socket) => {
            const userId = socket.handshake.query.user_id;
            if (userId) {
                socket.join(`user_${userId}`);
                console.log(`🔒 User ${userId} joined private room`);
            }
        });
        return io;
    },
    getIo: () => io,
    
   
    sendToUser: (receiverId, message) => {
        if (io) {
            io.to(`user_${receiverId}`).emit('new_private_message', message);
        }
    },

   
    broadcastMessageUpdate: (message) => {
        if (io) {
           
            if (message.receiver_id) {
                io.to(`user_${message.receiver_id}`).emit('message_updated', message);
                io.to(`user_${message.user_id}`).emit('message_updated', message);
            } else {
                
                io.emit('message_updated', message);
            }
        }
    }
};