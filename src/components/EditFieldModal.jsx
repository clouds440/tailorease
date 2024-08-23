import React, { useState, useEffect } from "react";
import SimpleButton from "./SimpleButton";
import { EditIcon } from "../graphics/icons/svgIcons";
import LoadingSpinner from "./LoadingSpinner";

function EditFieldModal({
  field,
  value,
  onClose,
  onSave,
  setShowMessage,
  setTrigger,
  isLoading,
}) {
  const [inputValue, setInputValue] = useState(value);

  const fieldLabels = {
    fullName: "Full Name",
    phone: "Phone Number",
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (field === "fullName") {
      if (!inputValue.trim()) {
        setShowMessage({
          type: "error",
          message: "Please enter your full name",
        });
        setTrigger("true");
        return;
      } else if (inputValue.length < 3) {
        setShowMessage({
          type: "error",
          message: "Name must be at least 3 characters",
        });
        setTrigger("true");
        return;
      }
    }

    // Call the onSave function if validation passes
    onSave(field, inputValue);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // Trigger the Cancel button on Esc key press
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const inputStyles =
    "w-full p-1 mt-4 peer text-gray-100 border-b-2 z-10 border-gray-100 outline-none focus:border-blue-500 transition-all duration-300 bg-transparent";
  const placeHolderStyles =
    "absolute top-5 pointer-events-none left-2 text-gray-600 duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="flex text-xl text-gray-100 font-bold mb-4">
          Change {fieldLabels[field]}
          <EditIcon size={"6"} color={"text-blue-400"} extraClasses={"ml-3"} />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              name={field}
              value={inputValue}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`}>
              {fieldLabels[field]}
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <SimpleButton
              btnText={"Cancel"}
              type={"cancel"}
              onClick={onClose}
            />
            {isLoading ? (
              <LoadingSpinner size={28} extraClasses={"px-5"} />
            ) : (
              <SimpleButton btnText={"Save Changes"} type={"primary"} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFieldModal;
