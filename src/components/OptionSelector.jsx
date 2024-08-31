import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OptionSelector = ({ options, value, onChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-36" ref={dropdownRef}>
      <div
        className={`p-2 flex items-center justify-between outline-none rounded-md cursor-pointer ${theme.mainTheme} ${theme.hoverBg}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options.find((option) => option.value === value)?.label ||
            "Select..."}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`absolute mt-2 p-2 items-center justify-center rounded-md w-full ${theme.mainTheme} z-10`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4 }}
          >
            {options.map((option, index) => (
              <motion.li
                key={index}
                className={`cursor-pointer p-2 rounded-md ${theme.hoverBg}`}
                onClick={() => handleSelect(option.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptionSelector;
