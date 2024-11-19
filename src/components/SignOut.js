import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase'; // Adjust the path as needed
import { signOut } from "firebase/auth";
import '../styles/SignOut.css';

const SignOut = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // State to track success or error message

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMessage("Signed out successfully!"); // Update message state
      console.log("Signed out successfully");
      setTimeout(() => navigate('/login'), 2000); // Redirect to the login page after 2 seconds
    } catch (error) {
      console.error("Error signing out: ", error);
      setMessage("Failed to sign out! Please try again."); // Display error message
    }
  };

  return (
    <div className="signout-container">
      <h2>Are you sure you want to sign out?</h2>
      <button onClick={handleSignOut} className="signout-button">
        Sign Out
      </button>
      {message && <p className="message">{message}</p>} {/* Conditionally render the message */}
    </div>
  );
};

export default SignOut;
