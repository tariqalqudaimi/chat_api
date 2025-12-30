/**
 * إعداد استراتيجية المصادقة (Google OAuth Strategy).
 * 
 * المهام الرئيسية:
 * 1. استقبال بيانات المستخدم من Google.
 * 2. التحقق عبر UserRepository إذا كان المستخدم جديداً أم موجوداً مسبقاً.
 * 3. إدارة عمليات serializeUser و deserializeUser لحفظ الجلسة (Session).
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserRepository = require('../repositories/user.repository');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        
        const user = await UserRepository.findOrCreate(profile);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
  }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserRepository.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;