import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	setPersistence,
	browserLocalPersistence
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDcr1gG5eRHbiyuB-Fb8bTuhd4I97hLlbA",
	authDomain: "salvatiopush-344309.firebaseapp.com",
	projectId: "salvatiopush-344309",
	storageBucket: "salvatiopush-344309.appspot.com",
	messagingSenderId: "57749978870",
	appId: "1:57749978870:web:5cdf3509ed43aa931ff6d7"
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const persistence = async () => {
	const test = await setPersistence(firebaseAuth, browserLocalPersistence);
	return test;
};
console.log(persistence);
const authProvider = new GoogleAuthProvider();

export { firebaseApp, firebaseAuth, authProvider };
