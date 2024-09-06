import {
  auth,
  db,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "../firebaseConfig";

import React, { useContext, useState } from "react";
import EditFieldModal from "./EditFieldModal";
import ChangePasswordModal from "./ChangePasswordModal";
import Optionselector from "./OptionSelector";
import UserContext from "../utils/UserContext";
import { DirectionContext } from "../utils/LayoutDirectionContext";
import {
  AdjustmentsIcon,
  EditIcon,
  SettingsIcon,
  UserIcon,
} from "../graphics/icons/svgIcons";
import SimpleButton from "./SimpleButton";
import { Navigate } from "react-router-dom";
import { t } from "i18next";
import i18n from "i18next";
import pk from "../graphics/icons/pk.png";
import uk from "../graphics/icons/uk.png";

function AccountSettings() {
  const {
    userData,
    theme,
    userLoggedIn,
    setUserData,
    setTheme,
    setShowMessage,
    setPopUpMessageTrigger,
  } = useContext(UserContext);

  const { setDirection } = useContext(DirectionContext);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    field: "",
    value: "",
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fieldLabels = {
    fullName: t("fullName"),
    phone: t("phone"),
  };

  const handleFieldClick = (field) => {
    if (field === "password") {
      setIsPasswordModalOpen(true);
    } else {
      setModalInfo({
        isOpen: true,
        field: field,
        value: typeof userData[field] !== "object" ? userData[field] : "",
      });
    }
  };

  const handleFieldSave = async (field, newValue) => {
    try {
      setIsLoading(true);
      // Check if the new value is different
      if (
        (field === "fullName" && newValue === userData.fullName) ||
        (field === "phone" && newValue === userData.phone)
      ) {
        setModalInfo({ isOpen: false, field: "", value: "" });
        return;
      }
      if (field === "phone") {
        if (!/^\d*$/.test(newValue)) {
          setShowMessage({
            type: "warning",
            message: t("phoneNumberDigitsError"),
          });
          setPopUpMessageTrigger("true");
          return;
        }
      }

      // Query Firestore to find the document with the matching UID
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", userData.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        throw new Error("No document found for the given UID.");
      }

      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);

      // Update the document
      await updateDoc(userDocRef, {
        [field]: newValue,
      });

      // Update only the changed field in userData
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: newValue,
      }));

      userData[field] = newValue;

      // Save the updated userData back to sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userData", JSON.stringify(userData));

      setUserData({ ...userData, [field]: newValue });
      setModalInfo({ isOpen: false, field: "", value: "" });

      setShowMessage({
        type: "success",
        message: `${fieldLabels[field]} ` + t("updateSuccess"),
      });
      setPopUpMessageTrigger("true");
    } catch (error) {
      setShowMessage({
        type: "danger",
        message: t("updateFail") + ` ${fieldLabels[field]}. ${error.message}`,
      });
      setPopUpMessageTrigger("true");
    } finally {
      setIsLoading(false);
    }
  };

  const hadleChangePassword = async (data) => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;

      // Re-authenticate the user with the current password
      const credential = EmailAuthProvider.credential(
        userData.email,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, data.newPassword);
      setShowMessage({
        type: "success",
        message: t("passwordSaved"),
      });
      setPopUpMessageTrigger("true");

      setIsPasswordModalOpen(false); // Close the modal
    } catch (error) {
      let errorMessage = t("errorOccurred") + ` ${error.message}`;
      if (error.code === "auth/invalid-credential") {
        errorMessage = t("invalidCurrentPassword");
      } else if (error.code === "auth/missing-password") {
        errorMessage = t("enterPassword");
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = t("tooManyFailedAttempts");
      }
      setShowMessage({ type: "danger", message: errorMessage });
      setPopUpMessageTrigger("true");
    } finally {
      setIsLoading(false);
    }
  };

  const themeOptions = [
    { value: "default", label: t("default") },
    { value: "light", label: t("light") },
    { value: "azure", label: t("azure") },
  ];

  const languageOptions = [
    { value: "en", label: "English", img: uk },
    { value: "ur", label: "اردو", img: pk },
  ];
  const [selectedTheme, setSelectedTheme] = useState(theme.themeName);
  const savedLanguage = JSON.parse(localStorage.getItem("lang")) || "en";
  const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);

  const handleThemeChange = (e) => {
    const themeName = e.target.value;
    setSelectedTheme(themeName);

    if (themeName === "default") {
      setTheme({
        themeName: "default",
        mainTheme: "theme-default",
        colorText: "text-gray-100",
        colorBorder: "border-white",
        iconColor: "text-blue-500",
        hoverText: "hover:text-blue-500",
        hoverBg: "hover:bg-indigo-400 hover:bg-opacity-30",
      });
    } else if (themeName === "light") {
      setTheme({
        themeName: "light",
        mainTheme: "theme-light",
        colorText: "text-black",
        colorBorder: "border-black",
        iconColor: "text-black",
        hoverText: "hover:text-gray-600",
        hoverBg: "hover:bg-gray-300 hover:bg-opacity-70",
      });
    } else if (themeName === "azure") {
      setTheme({
        themeName: "azure",
        mainTheme: "theme-azure",
        colorText: "text-sky-200",
        colorBorder: "border-sky-200",
        iconColor: "text-amber-400",
        hoverText: "hover:text-amber-400",
        hoverBg: "hover:bg-amber-300 hover:bg-opacity-50",
      });
    }
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setDirection(language === "en" ? "ltr" : "rtl");
  };

  const handleSavePreferences = () => {
    localStorage.setItem("theme", JSON.stringify(theme));
    localStorage.setItem("lang", JSON.stringify(selectedLanguage));
    setShowMessage({
      type: "success",
      message: t("changesSaved"),
    });
    setPopUpMessageTrigger("true");
    // Code to save the changes to the account here
  };

  if (!userLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      className={`mt-8 max-w-2xl w-80 sm:w-96 lg:w-auto mx-auto p-6 rounded-md select-none ${theme.mainTheme}`}
    >
      <h2
        className={`flex ltr:text-2xl rtl:text-xl font-bold mb-6 pt-6 border-b ${theme.colorBorder}`}
      >
        {t("accountSettings")}
        <SettingsIcon
          color={`${theme.iconColor}`}
          extraClasses={"ml-3 rtl:mr-3 mt-1"}
        />
      </h2>
      <div className="space-y-4">
        <h2 className="flex ltr:text-xl rtl:text-lg font-semibold  mb-6">
          {t("personalDetails")}
          <UserIcon
            color={`${theme.iconColor}`}
            extraClasses={"ltr:ml-3 rtl:mr-3 mt-1"}
          />
        </h2>
        <div className="flex justify-between items-center">
          <span>{t("fullName")}</span>
          <span
            className={`flex  cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("fullName")}
          >
            {userData.fullName}
            <EditIcon
              color={`${theme.iconColor}`}
              extraClasses={"ltr:ml-3 rtl:mr-3 mt-1"}
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>{t("email")}</span>
          <span className={`cursor-default`}>{userData.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>{t("phone")}</span>
          <span
            className={`flex  cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("phone")}
          >
            {userData.phone !== "" ? (
              userData.phone
            ) : (
              <span className={`italic ${theme.colorText} ${theme.hoverText}`}>
                {t("clickToAddPhone")}
              </span>
            )}
            <EditIcon
              color={`${theme.iconColor}`}
              extraClasses={"ltr:ml-3 rtl:mr-3 mt-1"}
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>{t("password")}</span>
          <span
            className={`flex cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("password")}
          >
            ●●●●●●●●
            <EditIcon
              color={`${theme.iconColor}`}
              extraClasses={"ltr:ml-3 rtl:mr-3 mt-1"}
            />
          </span>
        </div>
        <div className="space-y-4">
          <h2
            className={`flex ltr:text-xl rtl:text-lg font-semibold mb-6 pt-6`}
          >
            {t("preferences")}
            <AdjustmentsIcon
              color={`${theme.iconColor}`}
              extraClasses={"ltr:ml-3 rtl:mr-3 mt-1"}
            />
          </h2>
          <div className="flex justify-between items-center">
            <label htmlFor="select-options">{t("theme")}</label>
            <Optionselector
              options={themeOptions}
              value={selectedTheme}
              onChange={handleThemeChange}
              theme={theme}
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="select-options">{t("language")}</label>
            <Optionselector
              options={languageOptions}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              theme={theme}
            />
          </div>
          <div className="flex justify-end items-center">
            <SimpleButton
              onClick={handleSavePreferences}
              btnText={t("saveChanges")}
              type={"primary"}
              extraclasses={"w-full"}
            />
          </div>
        </div>
      </div>

      {modalInfo.isOpen && (
        <EditFieldModal
          field={modalInfo.field}
          value={modalInfo.value}
          onClose={() => setModalInfo({ isOpen: false, field: "", value: "" })}
          onSave={handleFieldSave}
          isLoading={isLoading}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={hadleChangePassword}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default AccountSettings;
