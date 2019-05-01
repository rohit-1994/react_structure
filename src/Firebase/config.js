import Firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyAlNrBTNREIrwxMctTUpTPKsJzlybGCbXU",
    authDomain: "wicycle-9e525.firebaseapp.com",
    databaseURL: "https://wicycle-9e525.firebaseio.com",
    projectId: "wicycle-9e525",
    storageBucket: "wicycle-9e525.appspot.com",
    messagingSenderId: "84454061413"
};

export default Firebase.initializeApp(config);