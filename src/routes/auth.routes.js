/**
 * تعريف مسارات المصادقة (Authentication Routes).
 * 
 * الروابط المتاحة:
 * - GET /google: توجيه المستخدم لصفحة دخول جوجل.
 * - GET /google/callback: استقبال الرد من جوجل وإنشاء الجلسة والكوكي.
 * - GET /logout: إنهاء الجلسة.
 * - GET /current_user: إرجاع بيانات المستخدم الحالي للواجهة الأمامية.
 */

const express = require('express');
const passport = require('passport');
const signature = require('cookie-signature');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: إدارة تسجيل الدخول والخروج والمستخدمين
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: بدء تسجيل الدخول عبر Google
 *     description: يقوم هذا الرابط بتوجيه المستخدم إلى صفحة جوجل لاختيار الحساب.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: إعادة توجيه إلى Google OAuth
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: استقبال الرد من Google (Callback)
 *     description: يستقبل هذا الرابط البيانات من جوجل، ينشئ الجلسة، ويعيد بيانات الكوكي لاستخدامها في Postman.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Login Successful
 *                 postman_helper:
 *                   type: object
 *                   description: بيانات مساعدة لنسخ الكوكي
 */
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),

    
    (req, res) => {
       const secret = process.env.JWT_SECRET || 'secret_key'; 

        
        const sessionID = req.sessionID;

        
        const signedCookie = `s:${signature.sign(sessionID, secret)}`;

        
        const finalCookieValue = encodeURIComponent(signedCookie);
        res.json({
            message: `Login Success & connect.sid=${finalCookieValue}`,
            
            
        });
    }
);

router.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: تسجيل الخروج
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: تم إنهاء الجلسة وإعادة التوجيه للصفحة الرئيسية
 */
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


module.exports = router;