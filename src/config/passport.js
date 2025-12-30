/**
 * إعداد استراتيجية جوجل.
 * المنطق هنا: إذا دخل المستخدم بحساب جوجل، أبحث عنه في القاعدة.
 * إذا كان موجوداً، أقوم بتسجيل دخوله.
 * إذا لم يكن موجوداً، أقوم بإنشاء حساب جديد له فوراً.
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