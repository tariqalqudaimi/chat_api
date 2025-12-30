
/**
 * وسيط التحقق من تسجيل الدخول (Authentication Middleware).
 * 
 * وظيفته حماية المسارات (Routes):
 * - يمنع الوصول لأي رابط إذا لم يكن المستخدم مسجلاً للدخول (req.isAuthenticated).
 * - يعيد رمز الخطأ 401 في حال عدم وجود صلاحية.
 */
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized. Please login via Google." });
};