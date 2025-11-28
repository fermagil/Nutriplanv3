/**
 * Configuración Firebase - Separada por seguridad
 */

// Configuración Firebase (en producción usar variables de entorno)
const firebaseConfig = {
    apiKey: "AIzaSyChC7s5NN-z-dSjqeXDaks7gaNaVCJAu7Q",
    authDomain: "nutriplanv2.firebaseapp.com",
    databaseURL: "https://nutriplanv2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nutriplanv2",
    storageBucket: "nutriplanv2.firebasestorage.app",
    messagingSenderId: "653707489758",
    appId: "1:653707489758:web:9133d1d1620825c385ed4f",
    measurementId: "G-NWER69E8B6"
};

export const getFirebaseConfig = () => {
    // En producción, podríamos validar la configuración aquí
    return firebaseConfig;
};