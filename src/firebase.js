import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD35tBrrAh75ao5iyiLvYCRRwDTvd6uH1k",
    authDomain: "running-app-5a6c3.firebaseapp.com",
    databaseURL: "https://running-app-5a6c3.firebaseio.com",
    projectId: "running-app-5a6c3",
    storageBucket: "running-app-5a6c3.appspot.com",
    messagingSenderId: "839912500487"
};

firebase.initializeApp(config);

export default firebase;
