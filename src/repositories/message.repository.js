/**
 * يتعامل هذا الملف مباشرة مع قاعدة البيانات لعزل كود SQL عن الكنترولر:
 * - getConversation: استعلام معقد لجلب الرسائل المتبادلة بين شخصين (Sender/Receiver).
 * - create: إدخال رسالة جديدة.
 * - update: تحديث نص الرسالة وتوقيت التعديل.
 * - delete: تنفيذ الحذف الناعم (تحديث حقل deleted_at).
 */


const db = require('../config/db');

class MessageRepository {
    
     async getConversation(userId, contactId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        return db('messages')
            .join('users', 'messages.user_id', 'users.id') 
            .select('messages.*', 'users.display_name', 'users.avatar')
            .where(builder => {
              
                builder.where({ user_id: userId, receiver_id: contactId })
                       .orWhere({ user_id: contactId, receiver_id: userId })
            })
            .whereNull('messages.deleted_at')
            .orderBy('messages.created_at', 'desc')
            .limit(limit)
            .offset(offset);
    }

    async create(data) {
        const [newMessage] = await db('messages').insert(data).returning('*');
        return newMessage;
    }

    async delete(id) {
    return db('messages')
        .where({ id })
        .delete
}

async findById(id) {
    return db('messages').where({ id }).first();
}


    async update(id, content) {
        const [updatedMessage] = await db('messages')
            .where({ id })
            .update({ 
                content,
                // updated_at: db.fn.now() 
            })
            .returning('*'); 
        
        return updatedMessage;
    }
}

module.exports = new MessageRepository();