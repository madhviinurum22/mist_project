// StatusRoutes.js
const express = require('express');
const StatusController = require('../controllers/StatusController');

const router = express.Router();

router.put('/status/:id', StatusController.updateUserStatus);

module.exports = router;
