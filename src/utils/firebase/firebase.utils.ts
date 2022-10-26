import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store-redux-toolkit/categories/categories-types';

const firebaseConfig = {
  apiKey: 'AIzaSyBNGB4t1h5pqBxadrYEnPaQRNfp1B2Avvo',
  authDomain: 'portfolio-ecommerce-7de06.firebaseapp.com',
  projectId: 'portfolio-ecommerce-7de06',
  storageBucket: 'portfolio-ecommerce-7de06.appspot.com',
  messagingSenderId: '426521253721',
  appId: '1:426521253721:web:2d54d5be9e29eb69181e48',
};

/// INITIALIZATION ///
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/// SIGN INs ///
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export type ObjectToAdd = {
  title: string;
};

/// CREATING DB DOCUMENTS ///

// To SENT DATA FROM THE FRONT-END TO THE DATABASE //
export const addCollectionAndDocument = async (
  collectionKey: string,
  objectsToAdd: ObjectToAdd[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

//* To GET DATA FROM THE DATABASE TO THE FRONT-END //
//? Sin exportar la lógica de transformación al reducer
// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, 'categories');
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
//     const { title, items } = docSnapshot.data();
//     accumulator[title.toLowerCase()] = items;
//     return accumulator;
//   }, {});

//   return categoryMap;
// };

//? Exportando la lógica de trasformación al reducer -> queda un array.
export const getCategoriesAndDocuments = async (
  list: string
): Promise<Category[]> => {
  const collectionRef = collection(db, list);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapShot) => docSnapShot.data() as Category
  );
};

// export type UserData = {
//   createdAt: Date;
//   displayName: string;
//   email: string;
// };

export type additionalInfo = {
  displayName?: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: additionalInfo = {}
): Promise<void | QueryDocumentSnapshot<User>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<User>;
};

/// INTERFACES ///
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return callback ? onAuthStateChanged(auth, callback) : null;
};
