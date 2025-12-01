const express = require('express');
const router = express.Router();
const multer = require('multer');
const connection = require('../config/database');

// Setup storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // folder to save files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Submit complaint
router.post('/submit-complaint', upload.array('evidence', 10), (req, res) => {
    // Your complaint submission logic
    res.send('Complaint submitted successfully!');
});

// Get complaints
router.get('/my-complaints', (req, res) => {
    // Your complaints retrieval logic
    res.send('Here are your complaints.');
});

module.exports = router;
