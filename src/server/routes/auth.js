//./server/routes/auth.js
const express = require('express');
const authController = require('../controller/authController');
const route = express.Router();



route.post('/api/login', authController.loginUser);

module.exports = route;