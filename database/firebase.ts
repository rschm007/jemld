// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIdMrSjNdbvX1zZeI3-Y9CIEUOYdk4AeQ",
    authDomain: "jemld-86ddd.firebaseapp.com",
    projectId: "jemld-86ddd",
    storageBucket: "jemld-86ddd.appspot.com",
    messagingSenderId: "824018292453",
    appId: "1:824018292453:web:df44f92991c857bdfa0e0c",
    measurementId: "G-TZR4E4REEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);