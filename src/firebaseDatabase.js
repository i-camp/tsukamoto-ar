import * as firebase from 'firebase';
import 'firebase/database';

const app  = firebase.initializeApp({
    apiKey: "AIzaSyApU8XjBHp5GjMgb1HLOYi4UFmKyhNQP-I",
    authDomain: "e-party2017.firebaseapp.com",
    databaseURL: "https://e-party2017.firebaseio.com",
    projectId: "e-party2017",
    storageBucket: "gs://e-party2017.appspot.com/",
});
const database = app.database();

export default database;
