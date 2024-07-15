"use client";
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          ...userDoc.data()
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerWithEmail = async (email, password, displayName, phoneNumber) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User registered:', user);

      // Save additional user details to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        displayName,
        phoneNumber,
        email: user.email
      });

      // Fetch the updated user details
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        phoneNumber,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      });

      console.log('User details saved to Firestore');
      return user;
    } catch (error) {
      console.error('Error registering with email:', error.message, error.code);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        ...userDoc.data()
      });

      return user;
    } catch (error) {
      console.error('Error logging in with email:', error.message, error.code);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        ...userDoc.data()
      });

      return user;
    } catch (error) {
      console.error('Error logging in with Google:', error.message, error.code);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message, error.code);
      throw error;
    }
  };

  return {
    currentUser,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };
};
