import {initializeApp} from "firebase/app"

const firebaseConfig={
  apiKey: "AIzaSyAZjlzNfvmtxiCJclxrkBJ2ZFWpE2kLGQ4",
  authDomain: "todolist-8e6d1.firebaseapp.com",
  databaseURL: "https://todolist-8e6d1-default-rtdb.firebaseio.com",
  projectId: "todolist-8e6d1",
  storageBucket: "todolist-8e6d1.appspot.com",
  messagingSenderId: "170786459760",
  appId: "1:170786459760:web:5fee789f4d22c28f99a4b5"
}
const db = initializeApp(firebaseConfig)
export default db;