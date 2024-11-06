document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('pass');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Cambiar el icono
    this.classList.toggle('fa-eye'); // Cambia al icono de "mostrar"
    this.classList.toggle('fa-eye-slash'); // Cambia al icono de "ocultar"
});
