// Importar Firebase desde el CDN (Firebase v9 y superior)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';  // Importación de Firebase Auth
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjmpdoxNj8rnXdroOnrSN0bURqdoaOavg",
    authDomain: "proyectoamp-6e2bc.firebaseapp.com",
    projectId: "proyectoamp-6e2bc",
    storageBucket: "proyectoamp-6e2bc.firebasestorage.app",
    messagingSenderId: "727985171480",
    appId: "1:727985171480:web:ae88e8e690fba76c0fa76d"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Inicializa Firebase Authentication
const db = getFirestore(app); // Inicializa Firestore

// Obtén los formularios y campos
const registroForm = document.getElementById('registroForm');
const loginForm = document.querySelector('.sign-in-form');  // Usar la clase sign-in-form
const emailInput = document.getElementById('email');
const nombreInput = document.getElementById('nombre');
const fechaNacimientoInput = document.getElementById('fechaNacimiento');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const loginEmailInput = document.getElementById('usuario');  // Cambio de ID
const loginPasswordInput = document.getElementById('pass');  // Cambio de ID

// Maneja el envío del formulario de registro
registroForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtén los valores de los campos
    const email = emailInput.value;
    const nombre = nombreInput.value;
    const fechaNacimiento = fechaNacimientoInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        // Crea el usuario con Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Usuario registrado:", user);

        // Guarda los datos en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento,
            uid: user.uid,
        });

        console.log("Datos del usuario guardados en Firestore");
        alert("¡Registro exitoso!");

        // Cerrar sesión automáticamente para evitar el login
        await auth.signOut(); // Esperamos que el signOut se complete correctamente

        // Espera a que el estado de autenticación cambie antes de redirigir
        onAuthStateChanged(auth, (user) => {
            if (!user) {  // Si no hay usuario autenticado
                console.log("El usuario se ha deslogueado correctamente.");
                window.location.href = "login.html"; // Redirigir a la página de login
            }
        });

    } catch (error) {
        console.error("Error al registrar usuario o guardar en Firestore:", error);

        // Mejor manejo de errores
        if (error.code === 'auth/email-already-in-use') {
            alert("Este correo ya está en uso. Por favor, intenta con otro.");
        } else if (error.code === 'auth/invalid-email') {
            alert("El correo electrónico no es válido. Por favor, ingresa un correo válido.");
        } else if (error.code === 'auth/weak-password') {
            alert("La contraseña es demasiado débil. Por favor, elige una contraseña más fuerte.");
        } else {
            alert("Hubo un error al registrar el usuario o guardar los datos.");
        }
    }
});


// Maneja el envío del formulario de inicio de sesión
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtén los valores de los campos
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    try {
        // Iniciar sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Usuario logueado:", user);

        // Redirigir a la página principal o dashboard
        window.location.href = "index.html"; // Redirige al index.html al iniciar sesión

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        // Mejor manejo de errores
        if (error.code === 'auth/user-not-found') {
            alert("No se encontró una cuenta con este correo.");
        } else if (error.code === 'auth/wrong-password') {
            alert("La contraseña es incorrecta.");
        } else {
            alert("Hubo un error al iniciar sesión.");
        }
    }
});


// Detecta el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuario autenticado:", user);
        // Mostrar contenido para el usuario autenticado o redirigir a una página protegida
    } else {
        console.log("No hay usuario autenticado");
        // Mostrar formulario de inicio de sesión o redirigir a la página de inicio de sesión
    }
});
