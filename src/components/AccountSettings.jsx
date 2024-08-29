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
import { VisibilityContext } from "../utils/VisibilityContext";
import {
  AdjustmentsIcon,
  EditIcon,
  SettingsIcon,
  UserIcon,
} from "../graphics/icons/svgIcons";

function AccountSettings({
  setShowMessage,
  setTrigger,
  userData,
  setTheme,
  theme,
}) {
  const [userInfo, setUserInfo] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone:
      userData.phone !== "" ? (
        userData.phone
      ) : (
        <span className={`italic text-gray-400 ${theme.hoverText}`}>
          Click to add phone
        </span>
      ),
    password: "********",
  });

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    field: "",
    value: "",
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { isComponentVisible } = useContext(VisibilityContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldClick = (field) => {
    if (field === "password") {
      setIsPasswordModalOpen(true);
    } else {
      setModalInfo({
        isOpen: true,
        field: field,
        value: typeof userInfo[field] !== "object" ? userInfo[field] : "",
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

      setUserInfo({ ...userInfo, [field]: newValue });
      setModalInfo({ isOpen: false, field: "", value: "" });

      setShowMessage({
        type: "success",
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`,
      });
      setTrigger(true);
    } catch (error) {
      setShowMessage({
        type: "danger",
        message: `Failed to update ${field}. ${error.message}`,
      });
      setTrigger(true);
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
        message: "Password saved!",
      });
      setTrigger("true");

      setIsPasswordModalOpen(false); // Close the modal
    } catch (error) {
      let errorMessage = `An error occurred: ${error.message}`;
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid current password";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter a password";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed attempts. Please contant customer support";
      }
      setShowMessage({ type: "danger", message: errorMessage });
      setTrigger("true");
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedTheme, setSelectedTheme] = useState("Default");

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);

    if (theme === "Default") {
      setTheme({
        mainTheme: "theme-default",
        colorText: "text-gray-100",
        colorBorder: "border-white",
        iconColor: "text-blue-500",
        hoverText: "hover:text-blue-500",
        hoverBg: "hover:bg-gray-700",
      });
    } else if (theme === "Light") {
      setTheme({
        mainTheme: "theme-light",
        colorText: "text-black",
        colorBorder: "border-black",
        iconColor: "text-black",
        hoverText: "hover:text-gray-600",
        hoverBg: "hover:bg-gray-300",
      });
    } else if (theme === "Azure") {
      setTheme({
        mainTheme: "theme-azure",
        colorText: "text-sky-200",
        colorBorder: "border-sky-200",
        iconColor: "text-amber-400",
        hoverText: "hover:text-amber-400",
        hoverBg: "hover:bg-amber-300 hover:bg-opacity-50",
      });
    }
  };

  if (!isComponentVisible("AccountSettings")) {
    return null;
  }
  return (
    <div
      className={`max-w-2xl mx-auto p-6 rounded-md ${theme.mainTheme} mt-8 select-none`}
    >
      <h2
        className={`flex text-2xl font-bold mb-6 pt-6 border-b ${theme.colorBorder}`}
      >
        Account Settings
        <SettingsIcon color={`${theme.iconColor}`} extraClasses={"ml-3 mt-1"} />
      </h2>
      <div className="space-y-4">
        <h2 className="flex text-xl font-semibold  mb-6">
          Persoanl Details
          <UserIcon color={`${theme.iconColor}`} extraClasses={"ml-3"} />
        </h2>
        <div className="flex justify-between items-center">
          <span>Full Name</span>
          <span
            className={`flex  cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("fullName")}
          >
            {userInfo.fullName}
            <EditIcon color={`${theme.iconColor}`} extraClasses={"ml-3"} />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Email</span>
          <span className=" cursor-default">{userInfo.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Phone</span>
          <span
            className={`flex  cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("phone")}
          >
            {userInfo.phone}
            <EditIcon color={`${theme.iconColor}`} extraClasses={"ml-3"} />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Password</span>
          <span
            className={`flex  cursor-pointer ${theme.hoverText}`}
            onClick={() => handleFieldClick("password")}
          >
            {userInfo.password}
            <EditIcon color={`${theme.iconColor}`} extraClasses={"ml-3"} />
          </span>
        </div>
        <div>
          <h2 className={`flex text-2xl font-semibold mb-6 pt-6`}>
            Preferences
            <AdjustmentsIcon
              color={`${theme.iconColor}`}
              extraClasses={"ml-3 mt-1"}
            />
          </h2>
          <div className="flex justify-between items-center">
            <label htmlFor="theme-selector">Theme</label>
            <select
              id="theme-selector"
              className={`ml-3 p-2 outline-none rounded-md w-28 ${theme.mainTheme}`}
              value={selectedTheme}
              onChange={handleThemeChange}
            >
              <option value="Default">Default</option>
              <option value="Light">Light</option>
              <option value="Azure">Azure</option>
            </select>
          </div>
        </div>
      </div>

      {modalInfo.isOpen && (
        <EditFieldModal
          setShowMessage={setShowMessage}
          setTrigger={setTrigger}
          field={modalInfo.field}
          value={modalInfo.value}
          onClose={() => setModalInfo({ isOpen: false, field: "", value: "" })}
          onSave={handleFieldSave}
          isLoading={isLoading}
          theme={theme}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          setShowMessage={setShowMessage}
          setTrigger={setTrigger}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={hadleChangePassword}
          isLoading={isLoading}
          theme={theme}
        />
      )}
    </div>
  );
}

export default AccountSettings;
