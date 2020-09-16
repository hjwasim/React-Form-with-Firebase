import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDQ45DPINFD4dBVFher63nBlY32D6HHx9Y",
    authDomain: "form-assignment-60bb3.firebaseapp.com",
    databaseURL: "https://form-assignment-60bb3.firebaseio.com",
    projectId: "form-assignment-60bb3",
    storageBucket: "form-assignment-60bb3.appspot.com",
    messagingSenderId: "345652186432",
    appId: "1:345652186432:web:d5d42b1f8479d99060bea5",
    measurementId: "G-H41GGZFFVL"
  };
const fireb = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

 export default fireb;