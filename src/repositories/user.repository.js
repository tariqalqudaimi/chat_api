/**
 * مستودع بيانات المستخدمين.
 * 
 * الوظائف الرئيسية:
 * - findOrCreate: البحث عن مستخدم بواسطة Google ID، وإنشاؤه إذا لم يكن موجوداً.
 * - findById: البحث عن مستخدم بواسطة الـ ID الخاص به (يستخدم في Passport).
 */

const db = require('../config/db');

class UserRepository {
    async findOrCreate(profile) {
       
        let user = await db('users').where('google_id', profile.id).first();

        if (!user) {
      
            const [newUser] = await db('users').insert({
                google_id: profile.id,
                email: profile.emails[0].value,
                display_name: profile.displayName,
                avatar: profile.photos[0].value
            }).returning('*');
            user = newUser;
        }
        return user;
    }

    async findById(id) {
        return db('users').where('id', id).first();
    }
}

module.exports = new UserRepository();