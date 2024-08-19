import React, { useState } from 'react';

function EditFieldModal({ field, value, onClose, onSave, setShowMessage, setTrigger }) {
  const [inputValue, setInputValue] = useState(value);

  const fieldLabels = {
    fullName: 'Full Name',
    phone: 'Phone Number',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage({
      type: "success",
      message: "Changes saved!",
    });
    setTrigger("true");
    onSave(field, inputValue);
  };

  const inputStyles = "w-full p-2 mt-4 peer text-gray-100 border-b-2 z-10 border-gray-100 outline-none focus:border-blue-500 transition-all duration-300 bg-transparent";
  const placeHolderStyles = "absolute top-5 pointer-events-none left-2 text-gray-600 duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl text-gray-100 font-bold mb-4">Change {fieldLabels[field]}</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              name={field}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`${inputStyles}`}
              placeholder=" "
              required
            />
            <label className={`${placeHolderStyles}`}>
              {fieldLabels[field]}
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFieldModal;
