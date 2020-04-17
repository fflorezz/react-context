import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCSMftomjcp2F7wDcRivwXPkepFwWJ0TBA",
  authDomain: "ecomerce-db-5d368.firebaseapp.com",
  databaseURL: "https://ecomerce-db-5d368.firebaseio.com",
  projectId: "ecomerce-db-5d368",
  storageBucket: "ecomerce-db-5d368.appspot.com",
  messagingSenderId: "912819891318",
  appId: "1:912819891318:web:cca2ce0523039e414b0357",
  measurementId: "G-V7XF94E8RM",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
