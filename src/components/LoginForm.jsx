import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth, collection, query, where, getDocs } from "../firebaseConfig";
import LoadingSpinner from "./LoadingSpinner";
import SimpleButton from "./SimpleButton";
import { VisibilityContext } from "../utils/VisibilityContext";

const LoginForm = ({ onLogin, setShowMessage, setTrigger, theme }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { isComponentVisible, hideComponent, showComponent } =
    useContext(VisibilityContext);

  if (!isComponentVisible("LoginForm")) {
    return null;
  }

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
        // Store userData in localSession
        sessionStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userData", JSON.stringify(userData));

        // Call the onLogin function with the user's data
        onLogin(userData);
        hideComponent("LoginForm");
      } else {
        console.error("No user data found!");
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
        errorMessage =
          "Too many failed attempts. Please contant customer support";
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
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
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
          {isLoading ? (
            <LoadingSpinner size={28} extraClasses={"mt-4"} />
          ) : (
            <>
              <SimpleButton
                btnText={"Log In"}
                type={"primary"}
                extraclasses={"w-full"}
              />
              <div className="items-center justify-center flex flex-col">
                <span className="mt-8">Don't have an account? </span>
                <SimpleButton
                  onClick={() => {
                    showComponent("SignUpForm");
                    hideComponent("LoginForm");
                  }}
                  btnText={"Sign Up Now"}
                  type={"cancel"}
                  extraclasses={"mt-1"}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
