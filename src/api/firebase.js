import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyABJ6SQZ0EOdVst1INHhIMvXNTLlIywh44",
  authDomain: "board-a5c8d.firebaseapp.com",
  databaseURL: "https://board-a5c8d-default-rtdb.firebaseio.com",
  projectId: "board-a5c8d",
  storageBucket: "board-a5c8d.appspot.com",
  messagingSenderId: "508896624907",
  appId: "1:508896624907:web:fd7ca8cf2988b8e2ca620e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const store = getFirestore(app);

export const register = async (user) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  await setDoc(doc(store, "users", res.user.uid), {
    ...user,
    uid: res.user.uid,
  });
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const onUserStateChange = () => {
  onAuthStateChanged(auth, (user) => {
    return user;
  });
};

export const addNewPost = async (data, url) => {
  const id = uuidv4();
  await setDoc(doc(store, "posts", id), {
    ...data,
    id,
    img: url,
    timestamp: serverTimestamp(),
  });
};

export const getPosts = async () => {
  let posts = [];
  const docSnap = await getDocs(collection(store, "posts"));
  docSnap.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};

export const getPost = async (postId) => {
  const docRef = doc(store, "posts", postId);
  const snapShot = await getDoc(docRef);
  if (snapShot.exists()) {
    return snapShot.data();
  }
  return {};
};

// doc으로 하면 되고 collection으로 하면 에러
export const updatePost = async (postId, data, url) => {
  url
    ? await updateDoc(doc(store, "posts", postId), {
        ...data,
        img: url,
        timestamp: serverTimestamp(),
      })
    : await updateDoc(doc(store, "posts", postId), {
        ...data,
        timestamp: serverTimestamp(),
      });
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(store, "posts", postId));
};
