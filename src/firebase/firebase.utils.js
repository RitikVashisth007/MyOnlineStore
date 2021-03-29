import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAz6oxOZ7y-eyrTLZWbAl_7mCnvQ44UP-s",
  authDomain: "myonlinestore-6327a.firebaseapp.com",
  projectId: "myonlinestore-6327a",
  storageBucket: "myonlinestore-6327a.appspot.com",
  messagingSenderId: "335824352672",
  appId: "1:335824352672:web:383569e46d77545588a0c5",
  measurementId: "G-K49HWL6W87"
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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
