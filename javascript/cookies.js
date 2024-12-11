// Función para mostrar el aviso de cookies solo una vez por sesión
function checkCookies() {
  const cookieDialog = document.getElementById("cookieDialog");
  const overlay = document.getElementById("overlay");
  const acceptButton = document.getElementById("acceptCookies");

  // Verificamos si el usuario ya aceptó las cookies
  if (!localStorage.getItem("cookiesAccepted")) {
      // Mostrar el aviso y la capa de fondo
      cookieDialog.classList.add('show');
      overlay.style.display = 'block';  // Mostrar la capa de fondo
  }

  acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");

      // Animación de desvanecimiento para cerrar el cuadro de cookies
      cookieDialog.classList.remove('show'); // Remover la clase que muestra el cuadro
      overlay.style.display = 'none';  // Ocultar la capa de fondo

      // Después de 0.3s (duración de la animación), ocultamos el cuadro de cookies completamente
      setTimeout(() => {
          cookieDialog.style.display = 'none'; // Finalmente ocultar el cuadro
      }, 300);  // Duración de la animación
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  checkCookies();  // Mostrar el aviso de cookies solo si no se ha aceptado
});
