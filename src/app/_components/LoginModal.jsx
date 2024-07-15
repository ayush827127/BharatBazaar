import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import SignupModal from "./SignupModal";

const LoginModal = ({ show, onClose,showLoginPopup }) => {
  const { loading, loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  if (!show && !showSignupPopup) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      const user = await loginWithGoogle();
      onClose();
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLoginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const user = await loginWithEmail(email, password);
      onClose();
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      setErrorMessage("Wrong email or password. Please try again.");
    } finally{
      setEmail("");
      setPassword("");
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSignupPopup(true);
    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleCloseSignupPopup = () => {
    setShowSignupPopup(false);
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-[420px] m-5 pt-0 items-center">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <form className="card-body" method="dialog">
              <h3 className="font-bold text-lg">Please Login!</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {errorMessage && (
                <p className="text-red-400 text-xs italic">
                  {errorMessage}
                </p>
              )}
              <div className="form-control mt-2">
                <button type="submit" onClick={handleLoginWithEmailAndPassword} className="btn btn-primary text-white">
                  Login
                </button>
              </div>
              <p className="text-center mt-2 mb-0">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={handleSignupClick}
                  className="underline text-red-400 ml-1"
                >
                  Signup Now
                </a>
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary text-white mt-3"
              >
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      )}
      <SignupModal show={showSignupPopup} onSignupPopupClose={handleCloseSignupPopup} showLoginPopup={showLoginPopup} />
    </>
  );
};

export default LoginModal;
