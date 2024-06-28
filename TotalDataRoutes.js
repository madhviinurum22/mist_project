// TotalDataRoutes.js
const express = require('express');
const TotalDataController = require('../controllers/TotalDataController');

const router = express.Router();

router.get('/total-users', TotalDataController.getTotalUsers);

module.exports = router;

