import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  db,
  auth,
  collection,
  query,
  where,
  getDocs,
  sendPasswordResetEmail,
} from "../firebaseConfig";
import LoadingSpinner from "./LoadingSpinner";
import SimpleButton from "./SimpleButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { BarLoader } from "react-spinners";

const LoginForm = () => {
  const {
    theme,
    setUserData,
    userLoggedIn,
    setUserLoggedIn,
    setShowMessage,
    setPopUpMessageTrigger,
  } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setShowMessage({
        type: "warning",
        message: "Please enter a valid email address.",
      });
      setPopUpMessageTrigger(true);
      return;
    }

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
        // Store userData in localSession
        sessionStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userData", JSON.stringify(userData));

        // set the user logged in state to true
        setUserLoggedIn(true);
        setUserData(userData);
        navigate("/");
      }
    } catch (error) {
      let errorMessage = `An error occurred: ${error.message}`;
      let errorType = "danger";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter an email";
        errorType = "info";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter a password";
        errorType = "info";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Account blocked! Please contact support";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later";
      }
      setShowMessage({ type: errorType, message: errorMessage });
      setPopUpMessageTrigger("true");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setShowMessage({
        type: "warning",
        message: "Please enter a valid email address.",
      });
      setPopUpMessageTrigger(true);
      return;
    }

    try {
      setIsResetLoading(true);
      await sendPasswordResetEmail(auth, formData.email);
      setShowMessage({
        type: "success",
        message:
          "If you've provided a valid email, you'll receive a password reset email.",
      });
      setPopUpMessageTrigger(true);
    } catch (error) {
      setShowMessage({
        type: "danger",
        message: "Error sending password reset email. Please try again.",
      });
      setPopUpMessageTrigger(true);
    } finally {
      setIsResetLoading(false);
    }
  };

  const inputStyles = `w-full p-1 mt-4 peer ${theme.colorText} border-b-2 z-10 ${theme.colorBorder} outline-none focus:border-blue-500 transition-all duration-300 bg-transparent`;

  const placeHolderStyles = `absolute top-5 pointer-events-none ltr:left-1 rtl:right-1 ${theme.colorText} duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:${theme.colorText} peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500`;

  if (userLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center mt-10 select-none">
      <div
        className={`p-6 rounded-lg ${theme.mainTheme} w-full max-w-md relative`}
      >
        <h2 className={`flex text-xl text-${theme.themeColor} font-bold mb-4`}>
          Log In
        </h2>
        <form onSubmit={handleSubmit} noValidate>
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
          <SimpleButton
            btnText={isLoading ? <LoadingSpinner size={24} /> : `Log In`}
            type={"primary-submit"}
            extraclasses={"w-full"}
          />
          <div className="items-center justify-center flex flex-row mt-8">
            <span>Forgot password? &nbsp;</span>
            {isResetLoading ? (
              <BarLoader color="#0000ff" width={137} />
            ) : (
              <span
                className="text-blue-800 hover:text-blue-600 cursor-pointer"
                onClick={handlePasswordReset}
              >
                Send a reset email
              </span>
            )}
          </div>
          <div className="items-center justify-center flex flex-row mt-8">
            <span>Need to create an &nbsp;</span>
            <Link to={"/signup"}>
              <span className="text-blue-800 hover:text-blue-600">
                account?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
