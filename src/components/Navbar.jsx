import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { SettingsIcon, LogoutIcon } from "../graphics/icons/svgIcons";

const Navbar = ({
  userLoggedIn,
  userName,
  onSignUpClick,
  onLoginClick,
  onLogout,
  onSettingsClick,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <ul className="flex space-x-4 mx-auto select-none">
          <li>
            <a
              href="#home"
              className="text-gray-300 hover:text-white hover:text-shadow-lg"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-300 hover:text-white hover:text-shadow-lg"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-gray-300 hover:text-white hover:text-shadow-lg"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white hover:text-shadow-lg"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          {userLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <span
                className="text-white cursor-pointer flex items-center hover:text-shadow-lg select-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Hello, {userName}{" "}
                <span className="ml-1 text-yellow-600">&#8942;</span>
              </span>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-600 rounded-md shadow-lg z-20">
                  <button
                    onClick={handleLogout}
                    className="flex justify-between items-center w-full text-left px-4 py-2 text-white hover:bg-slate-500 rounded-md"
                  >
                    Logout
                    <LogoutIcon
                      size={"6"}
                      color={"text-blue-400"}
                      extraClasses={"ml-3"}
                    />
                  </button>
                  <button
                    onClick={() => {
                      onSettingsClick();
                      setDropdownOpen(false);
                    }}
                    className="flex justify-between items-center w-full text-left px-4 py-2 text-white hover:bg-slate-500 rounded-md"
                  >
                    Account Settings
                    <SettingsIcon
                      size={"6"}
                      color={"text-blue-400"}
                      extraClasses={"ml-3"}
                    />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <SimpleButton
                onClick={onSignUpClick}
                btnText={"Sign Up"}
                type={"primary"}
              />
              <SimpleButton
                onClick={onLoginClick}
                btnText={"Login"}
                type={"primary"}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
