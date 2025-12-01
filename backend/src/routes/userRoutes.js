const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// User profile
router.get('/profile', (req, res) => {
    // Your profile logic
});

// Update profile
router.post('/update-profile', (req, res) => {
    // Your profile update logic
});

module.exports = router;