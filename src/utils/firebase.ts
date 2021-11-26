import { initializeApp } from "firebase/app";
import {
  child,
  equalTo,
  get,
  getDatabase,
  query,
  orderByChild,
  ref,
} from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfqBq3AfIg1wPjuHse3eiXqeDIxnhvp6U",
  authDomain: "oem1-elife-cloud-prod.firebaseapp.com",
  databaseURL: "https://oem2-elife-cloud-prod-default-rtdb.firebaseio.com",
  projectId: "oem2-elife-cloud-prod",
  storageBucket: "oem2-elife-cloud-prod.appspot.com",
  appId: "1:150904115315:android:03aeef2c831bbda0061a06",
};

// TODO: do not init at import time, but at first usage e.g. with a singleton
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(app);

const login = async (email: string, password: string) => {
  console.log("email:", email);
  console.log("password:", password);
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const getUser = async (uid: string) => {
  const path = `users/${uid}`;
  const snapshot = await get(child(ref(database), path));
  const user = snapshot.val();
  return user;
};

const getInstallations = async (uid: string) => {
  const path = "installations2";
  const snapshot = await get(
    query(ref(database, path), orderByChild("userid"), equalTo(uid))
  );
  const installations = snapshot.val();
  return installations;
};

export { login, getInstallations, getUser };
