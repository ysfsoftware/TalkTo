import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import { Provider }  from 'react-redux';
import store from './store';


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA4jBV3Lek3zXtPld9HVqqJRDFsaQ9BVrU",
    authDomain: "web-messenger1.firebaseapp.com",
    projectId: "web-messenger1",
    storageBucket: "web-messenger1.appspot.com",
    messagingSenderId: "1037756170682",
    appId: "1:1037756170682:web:3008d5673c26d0d97b5d83",
    measurementId: "G-VQ4NBZ98W4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.store= store;

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

