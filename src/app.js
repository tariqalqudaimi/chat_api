const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
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


app.use('/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/messages', messageRoutes);
app.get('/', (req, res) => res.send('Chat API is Running...'));

module.exports = app;