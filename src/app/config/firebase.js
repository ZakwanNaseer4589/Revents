import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDiNanH23NhpB2g0o03SyNGzoM8O7Y60Es",
    authDomain: "revents-app-4ac7e.firebaseapp.com",
    projectId: "revents-app-4ac7e",
    storageBucket: "revents-app-4ac7e.appspot.com",
    messagingSenderId: "199382628594",
    appId: "1:199382628594:web:5f8f3160e11f478e08f86b"

}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;