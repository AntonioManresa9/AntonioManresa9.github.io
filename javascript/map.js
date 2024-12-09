// Coordenadas de la ubicación de tu tienda (por ejemplo, Madrid, España)
var lat = 37.958229;  // Cambia con la latitud de tu tienda
var lon = -1.132432;  // Cambia con la longitud de tu tienda, 

// Inicializar el mapa en las coordenadas de tu tienda
var map = L.map('map').setView([lat, lon], 13);

// Cargar el mapa de OpenStreetMap como capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir un marcador en la ubicación de tu tienda
var marker = L.marker([lat, lon]).addTo(map);

// Añadir un pop-up con el nombre de la tienda o algún otro detalle
marker.bindPopup('<b>Mi Tienda</b><br>Dirección de la tienda').openPopup();
