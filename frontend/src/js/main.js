// Main application initialization
import { initAuthUI } from './components/auth-ui.js';
import { initAdminLogin, initUserSignup } from './auth.js';
import { initEditProfile, initProfileTabs } from './components/profile.js';
import { initComplaintForm } from './components/report-form.js';
import { initMyComplaints } from './components/complaints.js';
import { initHeader } from './components/header.js';

// Initialize based on current page
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    
    // Initialize header functionality
    initHeader();
    
    // Initialize UI toggling for auth pages
    initAuthUI();
    
    // Page-specific initializations
    if (path.includes('admin-login')) {
        initAdminLogin();
    } else if (path.includes('register')) {
        initUserSignup();
    } else if (path.includes('profile')) {
        initEditProfile();
        initProfileTabs();
    } else if (path.includes('complain') || path.includes('report-crime')) {
        initComplaintForm();
    } else if (path.includes('complaints') || path.includes('my-complaints')) {
        initMyComplaints();
    }
    
    // Initialize contact form if exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

function handleContactForm(e) {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted');
}