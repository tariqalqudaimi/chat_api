/**
 * هذا الـ Middleware مخصص للأمان .
 * وظيفته التأكد من أن المستخدم الذي يحاول حذف الرسالة هو صاحبها الحقيقي.
 */


const MessageRepository = require('../repositories/message.repository');

exports.canManageMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await MessageRepository.findById(id);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

    
        if (message.user_id !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized: You can only manage your own messages" });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};