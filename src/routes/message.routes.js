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
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: إدارة الرسائل والمحادثات
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: جلب المحادثة مع شخص معين
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: contact_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: رقم المستخدم الذي تريد جلب المحادثة معه
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: رقم الصفحة (للتصفح)
 *     responses:
 *       200:
 *         description: تم جلب الرسائل بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   sender_name:
 *                     type: string
 *       401:
 *         description: غير مسجل دخول
 */
router.get('/', isAuthenticated, messageController.getMessages);


/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: إرسال رسالة خاصة جديدة
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - receiver_id
 *             properties:
 *               content:
 *                 type: string
 *                 description: نص الرسالة
 *               receiver_id:
 *                 type: integer
 *                 description: رقم الشخص المستقبل
 *     responses:
 *       201:
 *         description: تم إرسال الرسالة بنجاح
 */
router.post('/', isAuthenticated, messageController.sendMessage);
/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: تعديل محتوى رسالة
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: رقم الرسالة المراد تعديلها
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: النص الجديد للرسالة
 *                 example: "تم تعديل النص"
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
 *       400:
 *         description: محتوى الرسالة فارغ
 *       403:
 *         description: غير مسموح (لست صاحب الرسالة)
 *       404:
 *         description: الرسالة غير موجودة
 */
router.delete('/:id', isAuthenticated, policy.canManageMessage, messageController.deleteMessage);
/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: حذف رسالة (Soft Delete)
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: رقم الرسالة المراد حذفها
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       403:
 *         description: غير مسموح (لست صاحب الرسالة)
 *       404:
 *         description: الرسالة غير موجودة
 */
router.put('/:id', isAuthenticated, policy.canManageMessage, messageController.updateMessage);
module.exports = router;