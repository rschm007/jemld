// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import flamelink from "flamelink";


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
let analytics, firebaseApp, firestore;
if (firebaseConfig?.projectId) {
    if (!firebase.apps.length) {
        firebaseApp = initializeApp(firebaseConfig);
    }

    if (firebaseApp.name && typeof window !== 'undefined') {
        analytics = getAnalytics(firebaseApp)
    }

    // Initialize Cloud Firestore and get a reference to the service
    firestore = getFirestore(firebaseApp);
}

export const app = flamelink({
    firebaseApp,
    env: 'production',
    locale: 'en-us',
    dbType: 'cf'
})

export const firebaseApi = "https://firestore.googleapis.com/v1/";
export const apiUrl = `${firebaseApi}/projects/${firebaseConfig.projectId}`;