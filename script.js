// Target Redirect Destination
const LOGIN_REDIRECT_URL = "https://tharahuokaing.github.io/recruitment_agency_login/";

// State Management
let currentLang = 'km';

// DOM Elements
const openRegisterBtn = document.getElementById('open-register-btn');
const heroRegisterBtn = document.getElementById('hero-register-btn');
const closeRegisterBtn = document.getElementById('close-register-btn');
const registerModal = document.getElementById('register-modal');

const registerForm = document.getElementById('register-form');
const regPass = document.getElementById('reg-password');
const regConfirmPass = document.getElementById('reg-confirm-password');
const toggleRegPassBtn = document.getElementById('toggle-reg-pass');
const toggleConfirmPassBtn = document.getElementById('toggle-confirm-pass');

const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

// Modal Display Control
function openModal() {
    registerModal.classList.add('active');
}

function closeModal() {
    registerModal.classList.remove('active');
    registerForm.reset();
}

openRegisterBtn.addEventListener('click', openModal);
heroRegisterBtn.addEventListener('click', openModal);
closeRegisterBtn.addEventListener('click', closeModal);

// Close Modal when clicking background
window.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        closeModal();
    }
});

// Password Masking Toggles
toggleRegPassBtn.addEventListener('click', () => {
    const isSecret = regPass.type === 'password';
    regPass.type = isSecret ? 'text' : 'password';
    toggleRegPassBtn.textContent = isSecret ? '🙈' : '👁️';
});

toggleConfirmPassBtn.addEventListener('click', () => {
    const isSecret = regConfirmPass.type === 'password';
    regConfirmPass.type = isSecret ? 'text' : 'password';
    toggleConfirmPassBtn.textContent = isSecret ? '🙈' : '👁️';
});

// Language Switcher Function
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'km' ? 'en' : 'km';
    langText.textContent = currentLang === 'km' ? 'English' : 'ភាសាខ្មែរ';
    
    updateTranslations();
});

function updateTranslations() {
    document.querySelectorAll('[data-km]').forEach(elem => {
        const text = elem.getAttribute(`data-${currentLang}`);
        if (text) elem.innerHTML = text;
    });
}

// Form Submission & Redirection Engine
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = regPass.value;
    const confirmPassword = regConfirmPass.value;

    // Check Password Consistency
    if (password !== confirmPassword) {
        alert(currentLang === 'km' 
            ? 'ពាក្យសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ! សូមពិនិត្យឡើងវិញ។' 
            : 'Passwords do not match! Please check again.');
        return;
    }

    // Success Notification & Redirect Action
    const successMsg = currentLang === 'km'
        ? 'ការចុះឈ្មោះបានជោគជ័យ! ប្រព័ន្ធនឹងបញ្ជូនអ្នកទៅកាន់ទំព័រចូលប្រើប្រាស់ (Login)...'
        : 'Registration successful! Redirecting you to the login page...';

    alert(successMsg);

    // Redirect to specified URL
    window.location.href = LOGIN_REDIRECT_URL;
});

// Initial Translation Setup
updateTranslations();
