/**
 * تعريف مسارات الرسائل (Message API Routes).
 * 
 * يربط طلبات HTTP بدوال الـ Controller المناسبة مع تطبيق الحماية:
 * - GET /: جلب المحادثات.
 * - POST /: إرسال رسالة جديدة.
 * - PUT /: تعديل رسالة (محمي بـ Policy).
 * - DELETE /: حذف رسالة (محمي بـ Policy).
 */

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const policy = require('../middlewares/policy.middleware'); 

router.get('/', isAuthenticated, messageController.getMessages);


router.post('/', isAuthenticated, messageController.sendMessage);

router.delete('/:id', isAuthenticated, policy.canManageMessage, messageController.deleteMessage);

router.put('/:id', isAuthenticated, policy.canManageMessage, messageController.updateMessage);
module.exports = router;