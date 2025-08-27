// frontend/firebase-auth.js (Final Updated Code for Step 6)

// Paste your copied firebaseConfig object here
const firebaseConfig = {
    apiKey: "AIzaSyAY4pk1GLp-D43iQz-CEdREbewgEC6Lo0g",
    authDomain: "studyhive-7cfcf.firebaseapp.com",
    projectId: "studyhive-7cfcf",
    storageBucket: "studyhive-7cfcf.appspot.com",
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
        await auth.signInWithPopup(googleProvider);
        // onAuthStateChanged will handle the rest
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

// Function to sign out
const signOut = async () => {
    try {
        await auth.signOut();
        console.log("User signed out successfully.");
        // onAuthStateChanged will handle UI update
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

// Function to send the token to our backend and fetch initial data
const verifyUserWithBackend = async (user) => {
    if (!user) return;

    try {
        // Get the Firebase ID token from the user
        const token = await user.getIdToken();

        // Send the token to our backend API to verify/create user in DB
        const response = await fetch('http://localhost:5001/api/auth/google-signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        if (!response.ok) {
            throw new Error('Backend verification failed.');
        }

        // Get user data from our backend (which comes from our MongoDB)
        const backendUser = await response.json();
        console.log("User verified with backend, data from MongoDB:", backendUser);
        
        // Update the global app state with data from OUR database
        appState.isAuthenticated = true;
        appState.user = {
            name: backendUser.name,
            email: backendUser.email,
            uid: backendUser.firebaseUid, // Using firebaseUid from our DB
            mongoId: backendUser._id // Storing MongoDB's unique ID
        };

        // --- THIS IS THE UPDATED PART ---
        // After user is verified, fetch their study groups
        await fetchStudyGroups(); // This function is in script.js
        // ------------------------------

    } catch (error) {
        console.error("Error verifying user with backend:", error);
        // If backend verification fails, sign the user out from Firebase as well
        signOut();
    } finally {
        // Finally, after all data is fetched, re-render the app
        renderApp();
    }
};


// Listen for authentication state changes
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in via Firebase.
        // Now, verify and get user data from OUR backend.
        verifyUserWithBackend(user);
    } else {
        // User is signed out.
        appState.isAuthenticated = false;
        appState.user = null;
        appState.currentPage = "login";
        // Re-render the app to show the login page
        renderApp();
    }
});