import React from "react";
import { auth, provider } from "./pages/user/Auth/firebase-config"; // Ensure the path is correct
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Define types for the response from the backend
interface BackendResponse {
  msg: string;
  uid: string;
  email: string;
  setted_password: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Handler for Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID token

      // Send the token to FastAPI backend for verification
      const response = await fetch("http://localhost:8000/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify token with backend.");
      }

      // Parse response from backend
      const data: BackendResponse = await response.json();
      console.log("Backend Response: ", data);

      // Optionally, handle the backend response here
      alert(`Login successful! Welcome, ${data.email}`);

      // If this is a new user, navigate them to the "Set Password" page
      if (data.setted_password === false) {
        localStorage.setItem("userEmail", data.email); // Store email for future use
        navigate("/set-password"); // Redirect to set password page
      } else {
        navigate("/dashboard"); // Otherwise, go to the dashboard or another page
      }

    } catch (error) {
      console.error("Google Sign-In error: ", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
