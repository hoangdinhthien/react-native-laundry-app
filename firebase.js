import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzju46adVGgblD3wcirdfJ6Z1YpLDtPJU',
  authDomain: 'laundry-application-704b8.firebaseapp.com',
  projectId: 'laundry-application-704b8',
  storageBucket: 'laundry-application-704b8.appspot.com',
  messagingSenderId: '860983459632',
  appId: '1:860983459632:web:59826ea17c8b98f66a92f5',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
