import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import {
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  HomeIcon,
  CartIcon,
  ServicesIcon,
  ContactIcon,
  SendIcon,
} from "../graphics/icons/svgIcons";
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
      text: "Option 3",
      icon: <SendIcon size={"6"} color={`${theme.iconColor}`} />,
      onClick: () => {
        showComponent("AccountSettings");
        setDropdownOpen(false);
      },
    },
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
      className={`flex-shrink-0 fixed left-0 top-0 h-screen w-16 sm:w-20 md:w-36 rounded-r-md overflow-hidden ${theme.mainTheme}`}
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
            <ul className="flex flex-col space-y-4 select-none w-full">
              <li
                className={`flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                <HomeIcon size={"5"} color={`${theme.iconColor}`} />
                <span className="hidden md:inline-block ml-2">Home</span>
              </li>
              <li
                className={`flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                <CartIcon size={"5"} color={`${theme.iconColor}`} />
                <span className="hidden md:inline-block ml-2">Market</span>
              </li>
              <li
                className={`flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                <ServicesIcon size={"5"} color={`${theme.iconColor}`} />
                <span className="hidden md:inline-block ml-2">Services</span>
              </li>
              <li
                className={`flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                <ContactIcon size={"5"} color={`${theme.iconColor}`} />
                <span className="hidden md:inline-block ml-2">Contact</span>
              </li>
            </ul>
          </div>
        </div>
        <AnimatePresence>
          {dropdownOpen && (
            <div className="flex items-baseline justify-center">
              <motion.ul
                className={`flex flex-col space-y-4 select-none w-full`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                {dropdownOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={option.onClick}
                    className={`flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full ${theme.hoverBg}`}
                  >
                    {option.icon}
                    <span className="hidden md:inline-block ml-2">
                      {option.text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </div>
          )}
        </AnimatePresence>
        <div
          className={`flex items-center md:justify-start justify-center px-4 py-2 rounded-lg w-full cursor-pointer ${theme.hoverBg}`}
          ref={dropdownRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userLoggedIn && (
            <div className="flex items-center">
              <span className="flex items-center select-none">
                <MenuIcon size={"5"} color={"text-yellow-600"} />
                <span className="hidden md:inline-block ml-2">Menu</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
