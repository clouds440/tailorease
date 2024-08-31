import React, { useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SimpleButton from "./SimpleButton";
import { VisibilityContext } from "../utils/VisibilityContext";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from "../firebaseConfig";

const SignUpForm = ({ onSignUp, setShowMessage, setTrigger, theme }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const { isComponentVisible, hideComponent, showComponent } =
    useContext(VisibilityContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!isComponentVisible("SignUpForm")) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setShowMessage({
        type: "info",
        message: "Please enter your full name",
      });
      setTrigger("true");
      return;
    } else if (formData.fullName.length < 3) {
      setShowMessage({
        type: "info",
        message: "Name must be at least 3 characters",
      });
      setTrigger("true");
      return;
    }

    if (!/^\d*$/.test(formData.phone)) {
      setShowMessage({
        type: "warning",
        message: "Phone number must contain only digits",
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
        message: "Registration Successful",
      });
      setTrigger("true");
      hideComponent("SignUpForm");
      onSignUp(formData);
    } catch (error) {
      let errorMessage = `An error occurred: ${error.message}`;
      let errorType = "info";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
        errorType = "warning";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters";
        errorType = "warning";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter an email";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter a password";
      }
      setShowMessage({ type: errorType, message: errorMessage });
      setTrigger("true");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = `w-full p-1 mt-4 peer ${theme.colorText} border-b-2 z-10 ${theme.colorBorder} outline-none focus:border-blue-500 transition-all duration-300 bg-transparent`;

  const placeHolderStyles = `absolute top-5 pointer-events-none left-2 ${theme.colorText} duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:${theme.colorText} peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500`;

  return (
    <div className="flex items-center justify-center mt-10">
      <div
        className={`p-6 rounded-lg ${theme.mainTheme} w-full max-w-md relative`}
      >
        <h2 className={`flex text-xl text-${theme.themeColor} font-bold mb-4`}>
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="fullName">
              Full Name
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="email">
              Email
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="password">
              Password
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="phone">
              Phone <span className="text-xs">(optional)</span>
            </label>
          </div>
          <SimpleButton
            btnText={isLoading ? <LoadingSpinner size={24} /> : `Sign Up`}
            type={"primary"}
            extraclasses={"w-full"}
          />
          <div className="items-center justify-center flex flex-col">
            <span className="mt-8">Already have an account? </span>
            <SimpleButton
              onClick={() => {
                showComponent("LoginForm");
                hideComponent("SignUpForm");
              }}
              btnText={"Log In Now"}
              type={"cancel"}
              extraclasses={"mt-1"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
