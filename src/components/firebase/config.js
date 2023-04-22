import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";




export const firebaseConfig = {
  apiKey: "AIzaSyA-Oni_ARy5bw-sYBVQFRhfSSixnEpjV-I",
  authDomain: "shoptoday-aa5af.firebaseapp.com",
  projectId: "shoptoday-aa5af",
  storageBucket: "shoptoday-aa5af.appspot.com",
  messagingSenderId: "915121800393",
  appId: "1:915121800393:web:5f3c22345d577117c27918"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =getStorage(app)

export default app
