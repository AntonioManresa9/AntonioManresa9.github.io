// Función para mostrar el aviso de cookies solo una vez por sesión
function checkCookies() {
  const cookieDialog = document.getElementById("cookieDialog");
  const overlay = document.getElementById("overlay");
  const acceptButton = document.getElementById("acceptCookies");

  // Verificamos si el usuario ya aceptó las cookies
  if (!localStorage.getItem("cookiesAccepted")) {
      // Mostrar el aviso y la capa de fondo
      cookieDialog.style.display = 'block';  
      overlay.style.display = 'block';  // Mostrar la capa de fondo
      setTimeout(() => cookieDialog.style.opacity = 1, 10); // Animación de opacidad
  }

  acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      // Cerrar el aviso y la capa de fondo con animación
      cookieDialog.style.opacity = 0; 
      overlay.style.display = 'none';  // Ocultar la capa de fondo
      setTimeout(() => cookieDialog.style.display = 'none', 300); // Después de 0.3s, ocultar el cuadro de cookies
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  checkCookies();  // Mostrar el aviso de cookies solo si no se ha aceptado
});
