
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHOsxzNjdqvvl7HiEXBfStMKlghwBnEMY",
    authDomain: "images-445f6.firebaseapp.com",
    projectId: "images-445f6",
    storageBucket: "images-445f6.appspot.com",
    messagingSenderId: "426622508993",
    appId: "1:426622508993:web:9a3d93017c76f14de7d940",
    measurementId: "G-KZ34WGPNQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { storage }