// Admin Login and OTP Verification
export function initAdminLogin() {
    document.addEventListener("DOMContentLoaded", function () {
        // EmailJS public key
        emailjs.init('1RHpGS2tq0gxGer21');

        let generatedOTP = "";

        const form = document.querySelector(".sign-in-form");
        if (!form) return; // Only run on admin login page

        const usernameInput = form.querySelector('input[name="username"]');
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');
        const districtSelect = form.querySelector('select[name="district"]');
        const otpContainer = document.getElementById("otp-container");
        const otpInputField = document.getElementById("otp-input-2");
        const otpError = document.getElementById("otp-error");
        const verifyOtpBtn = document.getElementById("verify-otp-btn");

        // Validation Error Elements
        const nameError = document.getElementById("name-error-admin");
        const emailError = document.getElementById("email-error-admin");
        const passwordError = document.getElementById("password-error-admin");

        // Validation Functions
        function validateUsername() {
            const username = usernameInput.value;
            if (username.length === 0) {
                nameError.innerHTML = "Username is required!";
                return false;
            }
            if (username.length <= 5) {
                nameError.innerHTML = "Username must contain at least 5 characters!";
                return false;
            }
            if (!username.match(/^[^\s]+$/)) {
                nameError.innerHTML = "Username can't contain spaces!";
                return false;
            }
            nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function validateEmail() {
            const email = emailInput.value;
            if (email.length === 0) {
                emailError.innerHTML = "Email is required";
                return false;
            }
            if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
                emailError.innerHTML = "Invalid email!";
                return false;
            }
            emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function validatePassword() {
            const password = passwordInput.value;
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

            if (password.length === 0) {
                passwordError.innerHTML = "Password is required!";
                return false;
            }
            if (!passwordRegex.test(password)) {
                passwordError.innerHTML = "Must contain letter, number, special character";
                return false;
            }
            passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function validateDistrict() {
            if (districtSelect.value === "" || districtSelect.value === null) {
                return false;
            }
            return true;
        }

        function validateForm() {
            return validateUsername() && validateEmail() && validatePassword() && validateDistrict();
        }

        // Event Listeners
        usernameInput.addEventListener("blur", validateUsername);
        emailInput.addEventListener("blur", validateEmail);
        passwordInput.addEventListener("blur", validatePassword);

        // Form submission handler
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!validateForm()) {
                otpError.innerHTML = "Please fix all errors before proceeding!";
                return;
            }

            // Generate and send OTP
            const email = emailInput.value;
            generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

            const templateParams = {
                to_email: email,
                otp: generatedOTP,
            };

            emailjs.send('service_pl2gk4v', 'template_8k86xhk', templateParams)
                .then(response => {
                    otpContainer.style.display = 'block';
                    verifyOtpBtn.style.display = "block";
                    otpError.innerHTML = "✅ OTP sent to your email";
                })
                .catch(error => {
                    otpError.innerHTML = "❌ Failed to send OTP: " + error.message;
                });
        });

        // OTP verification handler
        verifyOtpBtn.addEventListener("click", function () {
            const enteredOTP = otpInputField.value;

            if (enteredOTP === generatedOTP) {
                otpError.innerHTML = "✅ OTP verified. Processing login...";

                // Get form data
                const username = usernameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;
                const district = districtSelect.value;

                // Use API module for the request
                import('./api.js').then(apiModule => {
                    apiModule.adminLogin({
                        username: username,
                        email: email,
                        password: password,
                        district_name: district
                    }).then(response => {
                        otpError.innerHTML = "✅ " + response.message;
                        
                        // Redirect to admin dashboard after successful login
                        setTimeout(() => {
                            window.location.href = "/admin-dashboard";
                        }, 2000);
                    }).catch(error => {
                        otpError.innerHTML = "❌ Login failed: " + error.message;
                    });
                });
            } else {
                otpError.innerHTML = "❌ Incorrect OTP. Try again.";
            }
        });
    });
}// User Signup and OTP Verification
export function initUserSignup() {
    document.addEventListener("DOMContentLoaded", function () {
        // EmailJS public key
        emailjs.init('1RHpGS2tq0gxGer21');

        let generatedOTP = "";

        const form = document.querySelector(".sign-up-form");
        if (!form) return; // Only run on signup page

        const emailInput = document.getElementById("contact-email");
        const otpInputDiv = document.getElementById("otp-container");
        const otpInputField = document.getElementById("otp-input");
        const otpError = document.getElementById("otp-error");
        const submitError = document.getElementById("submit-error");

        // Validation Error Elements
        var nameError = document.getElementById("name-error-signup");
        var emailError = document.getElementById("email-error");
        var passwordError = document.getElementById("password-error");
        var confirmPasswordError = document.getElementById("confirm-password-error");

        function validateName() {
            var name = document.getElementById("signup-username").value;
            if (name.length === 0) {
                nameError.innerHTML = "Username is required!";
                return false;
            }
            if (name.length <= 5) {
                nameError.innerHTML = "Username must contain at least 5 characters!";
                return false;
            }
            if (!name.match(/^[^\s]+$/)) {
                nameError.innerHTML = "Username can't contain spaces!";
                return false;
            }
            nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function validateEmail() {
            var email = emailInput.value;
            if (email.length === 0) {
                emailError.innerHTML = "Email is required";
                return false;
            }
            if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
                emailError.innerHTML = "Invalid email!";
                return false;
            }
            emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function checkPassword() {
            const password = document.getElementById("signup-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

            if (password.length === 0) {
                passwordError.innerHTML = "Password is required!";
                return false;
            }
            if (!passwordRegex.test(password)) {
                passwordError.innerHTML = "Must contain letter, number, special character";
                return false;
            }
            if (confirmPassword.length === 0) {
                confirmPasswordError.innerHTML = "Please confirm your password!";
                return false;
            }
            if (password !== confirmPassword) {
                confirmPasswordError.innerHTML = "Passwords do not match!";
                return false;
            }
            passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
            confirmPasswordError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }

        function validateForm() {
            if (!validateName() || !validateEmail() || !checkPassword()) {
                submitError.style.display = "block";
                submitError.innerHTML = "Please fix errors to submit!";
                setTimeout(() => {
                    submitError.style.display = "none";
                }, 3000);
                return false;
            }
            return true;
        }

        function togglePassword(fieldId, icon) {
            const field = document.getElementById(fieldId);
            if (field.type === "password") {
                field.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                field.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        }

        // Event Listeners
        document.querySelectorAll(".toggle-password").forEach(icon => {
            icon.addEventListener("click", function () {
                const fieldId = this.getAttribute("data-target");
                togglePassword(fieldId, this);
            });
        });

        // OTP Logic
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            // If form is valid, generate and send OTP
            const email = emailInput.value;
            generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

            const templateParams = {
                to_email: email,
                otp: generatedOTP,
            };

            emailjs.send('service_pl2gk4v', 'template_8k86xhk', templateParams)
                .then(response => {
                    otpInputDiv.style.display = 'block';
                    document.getElementById("verify-otp-btn").style.display = "block";
                    otpError.innerHTML = "✅ OTP sent to your email";
                })
                .catch(error => {
                    otpError.innerHTML = "❌ Failed to send OTP";
                });
        });

        document.getElementById("verify-otp-btn").addEventListener("click", function () {
            const enteredOTP = otpInputField.value;

            if (enteredOTP === generatedOTP) {
                otpError.innerHTML = "✅ OTP verified. You can now register.";

                // Get Form Data
                const username = document.getElementById("signup-username").value;
                const email = document.getElementById("contact-email").value;
                const password = document.getElementById("signup-password").value;

                // Use API module for the request
                import('./api.js').then(apiModule => {
                    apiModule.userSignup({
                        username: username,
                        email: email,
                        password: password
                    }).then(response => {
                        otpError.innerHTML = "✅ " + response.message;
                        
                        // Redirect to profile page after successful registration
                        setTimeout(() => {
                            window.location.href = "/profile";
                        }, 2000);
                    }).catch(error => {
                        otpError.innerHTML = "❌ Registration failed: " + error.message;
                    });
                });
            } else {
                otpError.innerHTML = "❌ Incorrect OTP. Try again.";
            }
        });
    });
}