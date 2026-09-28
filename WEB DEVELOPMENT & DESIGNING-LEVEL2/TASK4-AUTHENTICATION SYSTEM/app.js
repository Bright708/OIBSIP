document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements - Views
    const loginView = document.getElementById("login-view");
    const registerView = document.getElementById("register-view");
    const dashboardView = document.getElementById("dashboard-view");

    // DOM Elements - Navigation Links
    const goToRegisterBtn = document.getElementById("go-to-register");
    const goToLoginBtn = document.getElementById("go-to-login");
    const logoutBtn = document.getElementById("logout-btn");

    // DOM Elements - Forms
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // DOM Elements - Inputs
    const loginUsernameInput = document.getElementById("login-username");
    const loginPasswordInput = document.getElementById("login-password");
    const regUsernameInput = document.getElementById("reg-username");
    const regPasswordInput = document.getElementById("reg-password");
    const acceptTermsCheckbox = document.getElementById("accept-terms");

    // DOM Elements - Alerts
    const loginError = document.getElementById("login-error");
    const registerError = document.getElementById("register-error");
    const registerErrorTitle = document.getElementById("register-error-title");
    const registerErrorMsg = document.getElementById("register-error-msg");

    // DOM Elements - Dashboard Displays
    const dashUserDisplay = document.getElementById("dash-user-display");
    const dashWelcomeName = document.getElementById("dash-welcome-name");

    // SHA-256 Hashing Utility (Web Crypto API)
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    // Password Visibility Toggles
    document.querySelectorAll(".toggle-password").forEach((icon) => {
        icon.addEventListener("click", () => {
            const input = icon.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });

    // LocalStorage Helpers
    function getUsers() {
        return JSON.parse(localStorage.getItem("authflow_users")) || [];
    }

    function saveUsers(users) {
        localStorage.setItem("authflow_users", JSON.stringify(users));
    }

    function getActiveSession() {
        return JSON.parse(localStorage.getItem("authflow_session"));
    }

    function setActiveSession(user) {
        localStorage.setItem(
            "authflow_session",
            JSON.stringify({ username: user.username, loggedInAt: new Date() }),
        );
    }

    function clearActiveSession() {
        localStorage.removeItem("authflow_session");
    }

    // View Navigation Router
    function showView(view) {
        loginView.classList.add("hidden");
        registerView.classList.add("hidden");
        dashboardView.classList.add("hidden");

        loginError.classList.add("hidden");
        registerError.classList.add("hidden");

        if (view === "login") loginView.classList.remove("hidden");
        if (view === "register") registerView.classList.remove("hidden");
        if (view === "dashboard") {
            const session = getActiveSession();
            if (!session) {
                showView("login");
                return;
            }
            dashUserDisplay.textContent = session.username;
            dashWelcomeName.textContent = session.username;
            dashboardView.classList.remove("hidden");
        }
    }

    // Registration Validation Logic
    function validatePassword(password) {
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        return hasMinLength && hasNumber;
    }

    // Registration Form Event
    registerForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        registerError.classList.add("hidden");

        const username = regUsernameInput.value.trim();
        const password = regPasswordInput.value;
        const acceptedTerms = acceptTermsCheckbox.checked;

        if (!username || !password) {
            registerErrorTitle.textContent = "Missing Fields";
            registerErrorMsg.textContent = "Please fill in all required fields.";
            registerError.classList.remove("hidden");
            return;
        }

        if (!acceptedTerms) {
            registerErrorTitle.textContent = "Terms Required";
            registerErrorMsg.textContent =
                "You must agree to the Terms of Service & Privacy Policy.";
            registerError.classList.remove("hidden");
            return;
        }

        if (!validatePassword(password)) {
            registerErrorTitle.textContent = "Weak Password";
            registerErrorMsg.textContent =
                "Password must be at least 8 characters long and contain at least 1 number.";
            registerError.classList.remove("hidden");
            return;
        }

        const users = getUsers();
        const userExists = users.some(
            (u) => u.username.toLowerCase() === username.toLowerCase(),
        );

        if (userExists) {
            registerErrorTitle.textContent = "User already exists";
            registerErrorMsg.textContent =
                "An account associated with this email or handle is already active.";
            registerError.classList.remove("hidden");
            return;
        }

        // Hash Password before persistence
        const hashedPassword = await hashPassword(password);
        users.push({ username, passwordHash: hashedPassword });
        saveUsers(users);

        // Auto Login & Redirect
        setActiveSession({ username });
        registerForm.reset();
        showView("dashboard");
    });

    // Login Form Event
    loginForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        loginError.classList.add("hidden");

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value;

        if (!username || !password) {
            loginError.classList.remove("hidden");
            return;
        }

        const users = getUsers();
        const hashedPassword = await hashPassword(password);

        // Check credentials matching
        const validUser = users.find(
            (u) =>
            u.username.toLowerCase() === username.toLowerCase() &&
            u.passwordHash === hashedPassword,
        );

        if (!validUser) {
            // Generic error message to prevent field disclosure
            loginError.classList.remove("hidden");
            return;
        }

        setActiveSession(validUser);
        loginForm.reset();
        showView("dashboard");
    });

    // Logout Event
    logoutBtn.addEventListener("click", () => {
        clearActiveSession();
        showView("login");
    });

    // View Switchers
    goToRegisterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showView("register");
    });

    goToLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showView("login");
    });

    // Initial Routing Check
    const currentSession = getActiveSession();
    if (currentSession) {
        showView("dashboard");
    } else {
        showView("login");
    }
});