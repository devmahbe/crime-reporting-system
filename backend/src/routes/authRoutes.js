const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/database');

// Login route
router.post('/login', (req, res) => {
    // Your login logic here
});

// Signup route  
router.post('/signup', (req, res) => {
    // Your signup logic here
});

// Logout route
router.post('/logout', (req, res) => {
    // Your logout logic here
});

module.exports = router;