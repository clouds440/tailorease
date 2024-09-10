import React, { useContext, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SimpleButton from "./SimpleButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from "../firebaseConfig";
import { t } from "i18next";

const SignUpForm = () => {
  const {
    theme,
    setUserData,
    userLoggedIn,
    setUserLoggedIn,
    setShowMessage,
    setPopUpMessageTrigger,
  } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setShowMessage({
        type: "info",
        message: t("enterFullName"),
      });
      setPopUpMessageTrigger("true");
      return;
    } else if (formData.fullName.length < 3) {
      setShowMessage({
        type: "info",
        message: t("nameMinLength"),
      });
      setPopUpMessageTrigger("true");
      return;
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setShowMessage({
        type: "warning",
        message: t("provideValidEmail"),
      });
      setPopUpMessageTrigger(true);
      return;
    }

    if (!/^\d*$/.test(formData.phone)) {
      setShowMessage({
        type: "warning",
        message: t("phoneNumberDigitsOnly"),
      });
      setPopUpMessageTrigger("true");
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
        message: t("registrationSuccessful"),
      });
      setPopUpMessageTrigger("true");
      setUserLoggedIn(true);
      setUserData(formData);
      navigate("/");
    } catch (error) {
      let errorMessage = t("errorOccurred") + ` ${error.message}`;
      let errorType = "danger";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = t("emailInUse");
        errorType = "warning";
      } else if (error.code === "auth/weak-password") {
        errorMessage = t("newPasswordMinLength");
        errorType = "warning";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = t("provideValidEmail");
        errorType = "info";
      } else if (error.code === "auth/missing-password") {
        errorMessage = t("enterPassword");
        errorType = "info";
      }
      setShowMessage({ type: errorType, message: errorMessage });
      setPopUpMessageTrigger("true");
    } finally {
      setIsLoading(false);
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
          {t("createAccount")}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
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
              {t("fullName")}
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
              {t("email")}
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
              {t("password")}
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
              {t("phone")} <span className="text-xs">{t("optional")}</span>
            </label>
          </div>
          <SimpleButton
            btnText={isLoading ? <LoadingSpinner size={24} /> : t("signUp")}
            type={"primary-submit"}
            extraclasses={"w-full"}
          />
          <div className="items-center justify-center flex flex-row mt-8">
            <Link to={"/login"}>
              <span className={`${theme.iconColor} ${theme.hoverText}`}>
                {t("login")}
              </span>
            </Link>
            <span>&nbsp; {t("toExistingAccount")}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
