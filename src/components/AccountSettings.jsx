import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import React, { useState } from 'react';
import EditFieldModal from './EditFieldModal';
import ChangePasswordModal from './ChangePasswordModal';

function AccountSettings({ setShowMessage, setTrigger, userData }) {
  const [userInfo, setUserInfo] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    password: '********',
  });

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    field: '',
    value: '',
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldClick = (field) => {
    if (field === 'password') {
      setIsPasswordModalOpen(true);
    } else {
      setModalInfo({
        isOpen: true,
        field: field,
        value: userInfo[field],
      });
    }
  };

  const handleFieldSave = (field, newValue) => {
    setUserInfo({ ...userInfo, [field]: newValue });
    setModalInfo({ isOpen: false, field: '', value: '' });
    // handle sumbit changes (name or phone). If newValue == userData.fullName/phone then we DON'T call an update function to the database
    console.log(field + ": " + newValue + " " + userData.fullName);
  };

  const hadleChangePassword = async (data) => {
    try {
        setIsLoading(true);
        const user = auth.currentUser;
  
        // Re-authenticate the user with the current password
        const credential = EmailAuthProvider.credential(userData.email, data.currentPassword);
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
          errorMessage = "Too many failed attempts. Please contant customer support";
        }
        setShowMessage({ type: "error", message: errorMessage });
        setTrigger("true");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Account Settings</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Full Name</span>
          <span
            className="text-gray-800 cursor-pointer hover:text-blue-500"
            onClick={() => handleFieldClick('fullName')}
          >
            {userInfo.fullName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Email</span>
          <span
            className="text-gray-800 cursor-default"
          >
            {userInfo.email}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Phone</span>
          <span
            className="text-gray-800 cursor-pointer hover:text-blue-500"
            onClick={() => handleFieldClick('phone')}
          >
            {userInfo.phone}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Password</span>
          <span
            className="text-gray-800 cursor-pointer hover:text-blue-500"
            onClick={() => handleFieldClick('password')}
          >
            {userInfo.password}
          </span>
        </div>
      </div>

      {modalInfo.isOpen && (
        <EditFieldModal
          setShowMessage={setShowMessage}
          setTrigger={setTrigger}
          field={modalInfo.field}
          value={modalInfo.value}
          onClose={() => setModalInfo({ isOpen: false, field: '', value: '' })}
          onSave={handleFieldSave}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          setShowMessage={setShowMessage}
          setTrigger={setTrigger}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={hadleChangePassword}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default AccountSettings;
