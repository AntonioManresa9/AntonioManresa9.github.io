const togglePassword1 = document.getElementById('togglePassword1');
const passwordField = document.getElementById('password');

const togglePassword2 = document.getElementById('togglePassword2');
const confirmPasswordField = document.getElementById('confirmPassword');

togglePassword1.addEventListener('click', () => {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePassword1.classList.toggle('fa-eye-slash');
});

togglePassword2.addEventListener('click', () => {
    const type = confirmPasswordField.type === 'password' ? 'text' : 'password';
    confirmPasswordField.type = type;
    togglePassword2.classList.toggle('fa-eye-slash');
});
