/**
 * إعداد تطبيق Express (Application Setup).
 * 
 * الوظائف الأساسية:
 * 1. إعداد الـ Middlewares الأساسية (JSON parsing, Sessions).
 * 2. تهيئة Passport.js للمصادقة.
 * 3. ربط ملفات التوجيه (Routes) بمساراتها الرئيسية (/auth, /api).
 * 
 */



const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.JWT_SECRET || 'anything_strong',
    resave: false,
    saveUninitialized: false, 
    cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/messages', messageRoutes);
app.get('/', (req, res) => res.send('Chat API is Running...'));

module.exports = app;