import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

// Initialize Firebase Auth with platform-specific persistence
let auth;

if (Platform.OS === "web") {
    auth = getAuth(app);
    auth.setPersistence(browserLocalPersistence).catch((error) => {
        console.error("Error setting web persistence:", error);
    });
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
}

export { auth };