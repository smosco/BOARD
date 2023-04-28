import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  query,
  collection,
  where,
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

  await updateProfile(auth.currentUser, {
    displayName: user.displayName,
  });

  await setDoc(doc(store, "users", res.user.uid), {
    ...user,
    uid: res.user.uid,
  });

  return res;
};

export const login = async (user) => {
  await signInWithEmailAndPassword(auth, user.email, user.password);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
};

export const logout = async () => {
  await signOut(auth);
};

export const addNewPost = async (user, data, url) => {
  const postId = uuidv4();
  await setDoc(doc(store, "posts", postId), {
    ...data,
    postId,
    writer: user.displayName,
    writerId: user.uid,
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

// doc으로 하면 되고 collection으로 하면 에러 => 일단 doc으로 포스팅을 했으니까요??
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

export const getPostsById = async (userId) => {
  const posts = [];
  const postsRef = collection(store, "posts");
  const q = query(postsRef, where("writerId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};
