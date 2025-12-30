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
const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
       
        res.json({
            message: "Login Success",
            
            
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

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


module.exports = router;