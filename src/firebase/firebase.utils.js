import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAQ8u7bydsKPl6UI5snZg1OnAgHiLtb37c",
  authDomain: "crwn-db-ea464.firebaseapp.com",
  databaseURL: "https://crwn-db-ea464.firebaseio.com",
  projectId: "crwn-db-ea464",
  storageBucket: "crwn-db-ea464.appspot.com",
  messagingSenderId: "900000176358",
  appId: "1:900000176358:web:7425291ce0004ef5f04327",
  measurementId: "G-X99NYCZV6L"
};

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const{displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName, 
          email, 
          createdAt,
          ...additionalData
        })

      }catch(error){
        console.log('Error creating User',error.message)
      }
    }

    return userRef;

    

  }


  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();

  };


  export const convertCollectionsSnapshotToMap = (collections) => {

    const transformedCollection = collections.docs.map( doc => 
      {
        const {title, items} = doc.data();

        return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id,
          title,
          items
        }
      });

      return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
      },{})
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

