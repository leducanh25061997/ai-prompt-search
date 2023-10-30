import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAS7pz-rgxDKFgEsVUgatLxsnCUZeAwzXA",
    authDomain: "galerieai.firebaseapp.com",
    projectId: "galerieai",
    storageBucket: "galerieai.appspot.com",
    messagingSenderId: "369469829338",
    appId: "1:369469829338:web:9fc67d37abf5425c08b5e3",
    measurementId: "G-XQ7DNFY6JR"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);