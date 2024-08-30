import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { SettingsIcon, LogoutIcon, MenuIcon } from "../graphics/icons/svgIcons";
import { VisibilityContext } from "../utils/VisibilityContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ userLoggedIn, setUserLoggedIn, userData, theme }) => {
  const [userFullName, setUserFullName] = useState(userData.fullName);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { showComponent, hideComponent, hideAllComponents } =
    useContext(VisibilityContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      setUserLoggedIn(false);
      hideAllComponents();
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

  useEffect(() => {
    setUserFullName(userData.fullName);
  }, [userData]);

  const dropdownOptions = [
    {
      text: "Settings",
      icon: <SettingsIcon size={"6"} color={`${theme.iconColor}`} />,
      onClick: () => {
        showComponent("AccountSettings");
        setDropdownOpen(false);
      },
    },
    {
      text: "Logout",
      icon: <LogoutIcon size={"6"} color={`${theme.iconColor}`} />,
      onClick: handleLogout,
    },
    // Add more options here as needed
  ];

  return (
    <nav
      className={`fixed left-0 top-0 h-screen w-24 md:w-36 rounded-r-md ${theme.mainTheme} overflow-hidden`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <Logo
            fontSize={"text-2xl"}
            classes={`my-5 pb-5 border-b ${theme.colorBorder}`}
          />
          {userLoggedIn ? (
            <div className="mb-4 py-1 text-center select-none">
              <span>{userFullName}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <SimpleButton
                onClick={() => {
                  showComponent("LoginForm");
                  hideComponent("SignUpForm");
                }}
                btnText={"Log In"}
                type={"primary"}
                extraclasses="w-full mx-2"
              />
            </div>
          )}
          <div className="flex items-center justify-center mt-10">
            <ul className="flex flex-col space-y-4 select-none">
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <HomeIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Home</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <AboutIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">About</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <ServicesIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Services</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <ContactIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Contact</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`flex items-center justify-center py-2 rounded-md w-full select-none cursor-pointer ${theme.hoverBg}`}
          ref={dropdownRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userLoggedIn && (
            <div className="relative">
              <span className="cursor-pointer flex items-center select-none">
                <MenuIcon size={"5"} color={"text-yellow-600"} />
                <span className="hidden md:inline-block">Menu</span>
              </span>
              <AnimatePresence>
                {dropdownOpen && (
                  <div className="flex w-full flex-col justify-center items-center absolute bottom-10 z-20">
                    <motion.ul
                      className={`rounded-lg w-36 px-2`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {dropdownOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={option.onClick}
                          className={`flex items-center justify-start space-x-2 px-2 py-3 my-4 ${theme.hoverBg} rounded-lg cursor-pointer`}
                        >
                          {option.icon}
                          <span className="hidden md:inline-block">
                            {option.text}
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
