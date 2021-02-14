import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyACfb5x8ldQ2N_sKmUwxefF-KiyHKbylco",
  authDomain: "crwn-db-f3a3b.firebaseapp.com",
  projectId: "crwn-db-f3a3b",
  storageBucket: "crwn-db-f3a3b.appspot.com",
  messagingSenderId: "804687467528",
  appId: "1:804687467528:web:3f8fcfbe678f792f516dbd",
  measurementId: "G-M198TYN2KM",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
