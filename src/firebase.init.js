// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCTVrqI0GSsoitl24E8s0DAd_FMbEwBXMk",
    authDomain: "music-bf240.firebaseapp.com",
    projectId: "music-bf240",
    storageBucket: "music-bf240.appspot.com",
    messagingSenderId: "1050568508671",
    appId: "1:1050568508671:web:6d724673f9f7ae8061f8ca",
    measurementId: "G-F07R9CTET3"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;