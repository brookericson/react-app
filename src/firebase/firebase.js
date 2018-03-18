import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD35tBrrAh75ao5iyiLvYCRRwDTvd6uH1k",
    authDomain: "running-app-5a6c3.firebaseapp.com",
    databaseURL: "https://running-app-5a6c3.firebaseio.com",
    projectId: "running-app-5a6c3",
    storageBucket: "running-app-5a6c3.appspot.com",
    messagingSenderId: "839912500487"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};

export default firebase;
