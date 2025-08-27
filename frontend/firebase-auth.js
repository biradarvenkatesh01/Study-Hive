// frontend/firebase-auth.js

// Paste your copied firebaseConfig object here
const firebaseConfig = {
  apiKey: "AIzaSyAY4pk1GLp-D43iQz-CEdREbewgEC6Lo0g",
  authDomain: "studyhive-7cfcf.firebaseapp.com",
  projectId: "studyhive-7cfcf",
  storageBucket: "studyhive-7cfcf.firebasestorage.app",
  messagingSenderId: "462636260729",
  appId: "1:462636260729:web:9bb601b6f3dc0ef9a363a8",
  measurementId: "G-4M9YW8G2S2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;
    console.log("Successfully signed in with Google!", user);
    // We will handle the app state change in script.js
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

// Function to sign out
const signOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Listen for authentication state changes
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    appState.isAuthenticated = true;
    appState.user = {
      name: user.displayName,
      email: user.email,
      uid: user.uid // Firebase unique user ID
    };
    appState.currentPage = "dashboard";
  } else {
    // User is signed out.
    appState.isAuthenticated = false;
    appState.user = null;
    appState.currentPage = "login";
  }
  // Re-render the app whenever auth state changes
  renderApp();
});