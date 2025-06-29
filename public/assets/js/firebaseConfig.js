// Replace these with your own Firebase project's credentials
const firebaseConfig = {
    apiKey: "AIzaSyDU7wyS8nhVvcQkLDafMtO-csIpmcw0hxE",
    authDomain: "exs-link.firebaseapp.com",
    databaseURL: "https://exs-link-default-rtdb.firebaseio.com/",
    projectId: "exs-link",
    storageBucket: "exs-link.appspot.com",
    messagingSenderId: "461343036338",
    appId: "1:461343036338:web:30b71a9f9b977379868aab",
};
  
// firebase initialize call
firebase.initializeApp(firebaseConfig);


// Optional: get reference to database
const database = firebase.database();