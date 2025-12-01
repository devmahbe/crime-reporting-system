const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Admin login
router.post('/adminLogin', (req, res) => {
    // Your admin login logic
});

// Admin dashboard
router.get('/admin-dashboard', (req, res) => {
    // Your admin dashboard logic
});

// Admin settings
router.get('/get-admin-settings', (req, res) => {
    // Your admin settings logic
});

module.exports = router;