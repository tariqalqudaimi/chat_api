/**
 * لقد استخدمت نمط Repository Pattern هنا.
 * الهدف هو فصل كود SQL (Knex) عن الـ Controller ليكون الكود أنظف وأسهل في الصيانة.
 */



const db = require('../config/db');

class MessageRepository {
    
    async getMessages(page = 1, limit = 10, userId = null) {
        const offset = (page - 1) * limit;

        const query = db('messages')
            .join('users', 'messages.user_id', 'users.id')
            .select('messages.*', 'users.display_name', 'users.avatar')
            .whereNull('messages.deleted_at')
            .orderBy('messages.created_at', 'desc')
            .limit(limit)
            .offset(offset);

        if (userId) {
            query.where('messages.user_id', userId);
        }

        return query;
    }

 
    async create(data) {
        const [newMessage] = await db('messages').insert(data).returning('*');
        return newMessage;
    }

    async delete(id) {
    return db('messages')
        .where({ id })
        .update({ deleted_at: db.fn.now() }); 
}

async findById(id) {
    return db('messages').where({ id }).first();
}
}

module.exports = new MessageRepository();