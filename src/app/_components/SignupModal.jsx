// src/components/LoginModal.js
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import CSS for styling

const SignupModal = ({ show, onSignupPopupClose, showLoginPopup }) => {
  const { loading, loginWithGoogle, registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    // Simple email validation
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const validateMobile = (mobile) => {
    // Simple mobile number validation
    return mobile.length == 12; // You can add more specific validation as required
  };

  if (!show) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      const user = await loginWithGoogle();
      onSignupPopupClose();
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleSignupWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Check if all fields are filled
    if (!username || !email || !password || !mobile) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate mobile number
    if (!validateMobile(mobile)) {
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }

    try {
      const user = await registerWithEmail(email, password, username, mobile);
      onSignupPopupClose();
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      setErrorMessage("There was an error with your signup. Please try again.");
    }
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    showLoginPopup();
    setTimeout(() => {
      onSignupPopupClose();
    }, 0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative  m-5 pt-0 items-center">
        <button
          onClick={onSignupPopupClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <form className="card-body" method="dialog">
          <h3 className="font-bold text-lg">Create Account!</h3>

          <div className="flex flex-col sm:flex-row sm:space-x-4">
            {/* username */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                required
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
            {/* password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* country code and mobile number */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <PhoneInput
                country={"in"} // Default country
                value={mobile}
                className="input p-2"
                onChange={(phone) => setMobile(phone)}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
              />
            </div>
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className="text-red-400 text-xs italic">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* signup btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Signup"
              onClick={handleSignupWithEmailAndPassword}
              className="btn btn-primary text-white sm:w-1/2 sm:m-auto"
            />
          </div>

          <p className="text-center mt-2 mb-0">
            Already have an account?{" "}
            <a
              href="#"
              onClick={handleLoginClick}
              className="underline text-red-400 ml-1"
            >
              Login
            </a>
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary text-white mt-3 sm:w-1/2 sm:m-auto"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
