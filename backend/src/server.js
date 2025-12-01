const app = require('./app');
const connection = require('./config/database');
const { exec } = require('child_process');
const os = require('os');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const URL = `http://${HOST}:${PORT}`;

console.log('🚀 Starting SecureVoice Crime Reporting System...\n');

const server = app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🛡️  SECUREVOICE CRIME REPORTING SYSTEM');
    console.log('='.repeat(60));
    console.log(`✅ Server Status:  RUNNING`);
    console.log(`📊 Environment:    ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔧 Port:           ${PORT}`);
    console.log('');
    console.log('🌐 ACCESS URLs:');
    console.log(`   📍 Local:       ${URL}`);
    console.log(`   🌐 Network:     http://${getLocalIP()}:${PORT}`);
    console.log('');
    console.log('🔗 QUICK NAVIGATION:');
    console.log(`   🏠 Homepage:        ${URL}/`);
    console.log(`   👤 User Login:      ${URL}/login`);
    console.log(`   📝 User Register:   ${URL}/register`);
    console.log(`   👔 Admin Login:     ${URL}/admin-login`);
    console.log(`   📞 Contact:         ${URL}/contact`);
    console.log(`   👤 Profile:         ${URL}/profile`);
    console.log(`   📋 Dashboard:       ${URL}/dashboard`);
    console.log(`   🚨 Report Crime:    ${URL}/complain`);
    console.log('');
    console.log('🔧 API Endpoints:');
    console.log(`   ❤️  Health Check:   ${URL}/api/health`);
    console.log('='.repeat(60));
    console.log('💡 Tip: Click any link above or copy to your browser!');
    console.log('='.repeat(60));

    // Auto-open browser in development
    if (process.env.NODE_ENV !== 'production') {
        autoOpenBrowser(URL);
    }
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`\n⚠️  Port ${PORT} is busy. Trying ${PORT + 1}...\n`);
        const newPort = PORT + 1;
        app.listen(newPort, () => {
            console.log(`✅ Server running on port ${newPort}`);
            console.log(`📍 Access: http://localhost:${newPort}`);
        });
    } else {
        console.error('\n❌ Server error:', err.message);
        process.exit(1);
    }
});

// Function to get local IP address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    return 'localhost';
}

// Function to auto-open browser
function autoOpenBrowser(url) {
    // Don't auto-open in CI environments
    if (process.env.CI || process.env.NODE_ENV === 'test') return;
    
    let command;
    const platform = process.platform;
    
    if (platform === 'darwin') {
        command = `open "${url}"`;
    } else if (platform === 'win32') {
        command = `start "" "${url}"`;
    } else {
        command = `xdg-open "${url}"`;
    }
    
    // Wait 1.5 seconds then open browser
    setTimeout(() => {
        exec(command, (error) => {
            if (error) {
                console.log('💡 Tip: Copy any URL above and open in your browser');
            } else {
                console.log('🌐 Browser opened automatically!');
            }
        });
    }, 1500);
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

module.exports = server;