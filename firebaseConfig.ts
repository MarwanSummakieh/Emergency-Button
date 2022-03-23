// import * as firebase from 'firebase';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDcr1gG5eRHbiyuB-Fb8bTuhd4I97hLlbA",
	authDomain: "salvatiopush-344309.firebaseapp.com",
	projectId: "salvatiopush-344309",
	storageBucket: "salvatiopush-344309.appspot.com",
	messagingSenderId: "57749978870",
	appId: "1:57749978870:web:5cdf3509ed43aa931ff6d7"
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)


export { firebaseApp, firebaseAuth };
