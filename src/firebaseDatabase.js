import * as firebase from 'firebase';
import 'firebase/database';

const app  = firebase.initializeApp({
    apiKey: "AIzaSyDNYQeL3jpu_JBsbjqj4wjuHu7YaMPJIho",
    authDomain: "t-shooter.firebaseapp.com",
    databaseURL: "https://t-shooter.firebaseio.com",
    projectId: "t-shooter",
    storageBucket: "t-shooter.appspot.com",
});
const database = app.database();

export default database;
