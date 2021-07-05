import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBviZuKOBk3M6fZzocyMcWgcF8FzMpAJsM",
    authDomain: "letmeask-4d6f6.firebaseapp.com",
    databaseURL: "https://letmeask-4d6f6-default-rtdb.firebaseio.com",
    projectId: "letmeask-4d6f6",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }

const auth = firebase.auth()

const database = firebase.database()

export { firebase, auth, database }
