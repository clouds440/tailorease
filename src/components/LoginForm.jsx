import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth, collection, query, where, getDocs } from "../firebaseConfig";
import LoadingSpinner from "./LoadingSpinner";

const LoginForm = ({ onLogin, setShowMessage, setTrigger }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        onLogin(userData.fullName, userData.uid);
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials!";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter an email!";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter a password!";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Account blocked! Please contact support.";
      }
      setShowMessage({ type: "error", message: errorMessage });
      setTrigger("true");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 p-6 rounded-lg shadow-md w-1/4 mx-auto mt-10"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
      )}
    </form>
  );
};

export default LoginForm;
