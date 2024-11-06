// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx0ITYHweaAde1wuiml6MspuWI1FUEN4c",
  authDomain: "proyectoamp-34fb1.firebaseapp.com",
  databaseURL: "https://proyectoamp-34fb1-default-rtdb.firebaseio.com",
  projectId: "proyectoamp-34fb1",
  storageBucket: "proyectoamp-34fb1.firebasestorage.app",
  messagingSenderId: "546700021782",
  appId: "1:546700021782:web:d6818ad1e6bf38d4862537",
  measurementId: "G-RYMCR8YGPM"
};
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();  // Accedemos a Firestore
  
  // Registro de usuario
const registerForm = document.getElementById('registroForm');
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const nombre = document.querySelector('input[placeholder=""]').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Crear un objeto con los datos del nuevo usuario
  const newUser = {
    email: email,
    password: password,  // Recuerda que guardar contraseñas sin cifrar no es seguro
    nombre: nombre,
    fechaNacimiento: fechaNacimiento
  };

  // Guardar el nuevo usuario en Firestore
  db.collection('users').add(newUser)
    .then(() => {
      alert('Registro exitoso');
      window.location.href = 'index.html';  // Redirigir o hacer algo más
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un problema al registrar el usuario.');
    });
});


// Login de usuario
const loginForm = document.querySelector('.sign-in-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('usuario').value;
  const password = document.getElementById('pass').value;

  // Buscar el usuario por el email en la colección 'users'
  db.collection('users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Si encontramos al menos un usuario
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          
          // Verificar la contraseña
          if (userData.password === password) {
            alert('Login exitoso');
            window.location.href = 'index.html';  // Redirigir a la página principal u otra
          } else {
            alert('Contraseña incorrecta');
          }
        });
      } else {
        alert('Usuario no encontrado');
      }
    })
    .catch((error) => {
      console.error('Error al intentar hacer login:', error);
      alert('Hubo un problema al intentar acceder.');
    });
});
