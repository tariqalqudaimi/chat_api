const MessageRepository = require('../repositories/message.repository');
const socketService = require('../services/socket.service');
exports.getMessages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        // const userId = req.query.user_id || null;
        const userId = req.user.id;
        const messages = await MessageRepository.getMessages(page, 10, userId);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { content } = req.body;

        // Task 2.b: Validate content is required
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "Content is required" });
        }

        const messageData = {
            content,
            user_id: req.user.id // نأخذه من الجلسة بعد تسجيل الدخول
        };

        const message = await MessageRepository.create(messageData);

        //   const messageWithUserInfo = {
        //     ...message,
        //     display_name: req.user.display_name,
        //     avatar: req.user.avatar
        // };

        // داخل sendMessage
const messageWithUserInfo = {
    ...message,
    display_name: req.user?.display_name || 'Anonymous', // إضافة ? للأمان
    avatar: req.user?.avatar || ''
};
        
        socketService.broadcastNewMessage(messageWithUserInfo);

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await MessageRepository.delete(id);
        
        // إشعار الآخرين عبر السوكيت أن رسالة قد حُذفت (اختياري ولكن احترافي)
        socketService.getIo().emit('message_deleted', id);

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};