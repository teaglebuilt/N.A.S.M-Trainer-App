import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBUVWiiwZ2nqSJJNg5WmRWKBux9mTPUtws",
    authDomain: "nasm-fitness-app.firebaseapp.com",
    databaseURL: "https://nasm-fitness-app.firebaseio.com",
    projectId: "nasm-fitness-app",
    storageBucket: "nasm-fitness-app.appspot.com",
    messagingSenderId: "144047638082"
  };
  const fire = firebase.initializeApp(config);

  export default fire