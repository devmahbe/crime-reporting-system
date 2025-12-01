const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'securevoice_crime_reporting_secret_key_2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use('/css', express.static(path.join(__dirname, '../../frontend/src/css')));
app.use('/js', express.static(path.join(__dirname, '../../frontend/src/js')));
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/reports', reportRoutes);
app.use('/admin', adminRoutes);

// Serve main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/register.html'));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/admin-login.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/contact.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/profile.html'));
});

app.get('/complain', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/report-crime.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/dashboard.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'SecureVoice API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Catch all handler - serve index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

module.exports = app;