// Firebase app is always required and must be first
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBIdMrSjNdbvX1zZeI3-Y9CIEUOYdk4AeQ",
    authDomain: "jemld-86ddd.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/project/jemld-86ddd/firestore/data/",
    projectId: "jemld-86ddd",
    storageBucket: "jemld-86ddd.appspot.com",
    messagingSenderId: "824018292453",
    appId: "1:824018292453:web:df44f92991c857bdfa0e0c",
    measurementId: "G-TZR4E4REEQ",
};

// Initialize Firebase
export let firebaseApp, firestore;
if (firebaseConfig?.projectId) {
    firebaseApp = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    firestore = getFirestore(firebaseApp);
}