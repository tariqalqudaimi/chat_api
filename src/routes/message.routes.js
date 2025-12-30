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