import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from "../firebaseConfig";

const SignUpForm = ({ setShowMessage, setTrigger }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.fullName == null ||
      formData.fullName === "" ||
      formData.fullName === "   "
    ) {
      setShowMessage({
        type: "error",
        message: "Please enter your full name!",
      });
      setTrigger("true");
      return;
    } else if (formData.fullName.length < 3) {
      setShowMessage({
        type: "error",
        message: "Name must be at least 3 characters!",
      });
      setTrigger("true");
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      setShowMessage({
        type: "success",
        message: "Registration Successful!",
      });
      setTrigger("true");
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use!";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters!";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter an email!";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter a password!";
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
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
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
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone <span className="text-xs">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
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
          Sign Up
        </button>
      )}
    </form>
  );
};

export default SignUpForm;
