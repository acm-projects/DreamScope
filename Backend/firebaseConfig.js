import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5Qv9a-WZ8w62rKC3W--yVnGedHaVZmCc",
    authDomain: "dreamsco-2b0e6.firebaseapp.com",
    projectId: "dreamsco-2b0e6",
    storageBucket: "dreamsco-2b0e6.firebasestorage.app",
    messagingSenderId: "85991357219",
    appId: "1:85991357219:web:16ff24866de8ea871eaa96",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth with AsyncStorage
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
