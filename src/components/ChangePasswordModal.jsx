import React, { useState } from 'react';

function ChangePasswordModal({ onClose, onSave, setShowMessage, setTrigger }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'newPassword') {
          setNewPassword(value);
        }
        if (name === 'confirmPassword') {
          setConfirmPassword(value);
        }
        
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };      

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setShowMessage({
            type: "error",
            message: "New passwords do not match!",
          });
          setTrigger("true");
        return;
      }
    setShowMessage({
        type: "success",
        message: "Password saved!",
      });
      setTrigger("true");
      onSave(formData);
  };

  const inputStyles = "w-full p-2 mt-4 peer text-gray-100 border-b-2 z-10 border-gray-100 outline-none focus:border-blue-500 transition-all duration-300 bg-transparent";
  const placeHolderStyles = "absolute top-5 pointer-events-none left-2 text-gray-600 duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl text-gray-100 font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
              required
            />
            <label
              className={`${placeHolderStyles}`}
            >
              Current Password
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
              required
            />
            <label
              className={`${placeHolderStyles}`}
            >
              New Password
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
              required
            />
            <label
              className={`${placeHolderStyles}`}
            >
              Confirm Password
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;