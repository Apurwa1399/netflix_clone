import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCNaajDf4vKOYIlfq7xxDTFUZRTHHYONC0",
  authDomain: "netflix-clone-ff93b.firebaseapp.com",
  projectId: "netflix-clone-ff93b",
  storageBucket: "netflix-clone-ff93b.firebasestorage.app",
  messagingSenderId: "514003567937",
  appId: "1:514003567937:web:d09359fa21bf301b6d4dc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db= getFirestore(app);

const signup= async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    };
}

const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= async()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};