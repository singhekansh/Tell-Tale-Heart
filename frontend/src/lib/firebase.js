import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { useUserStore } from "@/store/userStore"
import { toast } from "@/components/ui/use-toast"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebase_apiKey,
  authDomain: import.meta.env.VITE_firebase_authDomain,
  projectId: import.meta.env.VITE_firebase_projectId,
  storageBucket: import.meta.env.VITE_firebase_storageBucket,
  messagingSenderId: import.meta.env.VITE_firebase_messagingSenderId,
  appId: import.meta.env.VITE_firebase_appId,
  measurementId: import.meta.env.VITE_firebase_measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const auth = getAuth(app)

// Authentication
const googleProvider =  new GoogleAuthProvider()


export const googleSignIn = () => {
  signInWithPopup(auth, googleProvider)
}