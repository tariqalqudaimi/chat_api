/**
 * المتحكم الخاص بالرسائل (Message Controller).
 * 
 * يدير هذا الملف منطق العمل (Business Logic) للرسائل:
 * - getMessages: جلب المحادثة الخاصة بين المستخدم وطرف آخر.
 * - sendMessage: التحقق من البيانات، حفظ الرسالة، وبثها فورياً للمستقبل عبر السوكيت.
 * - updateMessage: تعديل محتوى الرسالة وإعلام الأطراف بالتغيير.
 * - deleteMessage: حذف الرسالة (Soft Delete).
 */

const MessageRepository = require('../repositories/message.repository');
const socketService = require('../services/socket.service');

exports.getMessages = async (req, res) => {
    try {
        const myId = req.user.id;
        
        const contactId = req.query.contact_id; 

        if (!contactId) return res.status(400).json({ error: "contact_id required" });

        const messages = await MessageRepository.getConversation(myId, contactId);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        
        const { content, receiver_id } = req.body;
        const myId = req.user.id;

        if (!content || !receiver_id) {
            return res.status(400).json({ error: "Content and receiver_id are required" });
        }

        const message = await MessageRepository.create({
            content,
            user_id: myId,
            receiver_id: receiver_id
        });

        
        socketService.sendToUser(receiver_id, {
            ...message,
            sender_name: req.user.display_name
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await MessageRepository.delete(id);
        
        
        socketService.getIo().emit('message_deleted', id);

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "المحتوى الجديد مطلوب" });
        }

        
        const updatedMessage = await MessageRepository.update(id, content);

        socketService.broadcastMessageUpdate({
            ...updatedMessage,
            display_name: req.user.display_name
        });

        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};