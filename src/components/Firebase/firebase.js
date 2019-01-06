import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyAKneQl4Yg727bsuhVkC8fWfmGO3W7ybzI",
    authDomain: "flix-this.firebaseapp.com",
    databaseURL: "https://flix-this.firebaseio.com",
    projectId: "flix-this",
    storageBucket: "flix-this.appspot.com",
    messagingSenderId: "576327147035"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;