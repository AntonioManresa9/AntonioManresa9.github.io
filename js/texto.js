// Script para mostrar un mensaje de bienvenida animado
document.addEventListener("DOMContentLoaded", function() {
    const bienvenida = document.createElement('div');
    bienvenida.classList.add('welcome-message');
    bienvenida.textContent = "Bienvenido al Centro de Masajes Orientales, tu refugio de paz y armonía.";
    document.body.appendChild(bienvenida);

    setTimeout(function() {
        bienvenida.style.opacity = '0';
        setTimeout(() => bienvenida.remove(), 1000); // Eliminar el mensaje después de 1 segundo
    }, 4000); // Desaparece después de 4 segundos
});

// Animación de entrada para los artículos cuando se hagan scroll
const articles = document.querySelectorAll('article');

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    articles.forEach((article, index) => {
        const position = article.getBoundingClientRect().top + scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY > position - windowHeight + 100) {
            article.style.transform = 'translateY(0)';
            article.style.opacity = '1';
        } else {
            article.style.transform = 'translateY(100px)';
            article.style.opacity = '0';
        }
    });
});
