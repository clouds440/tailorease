import React, { useEffect, useState } from "react";

function Message({ message, type, trigger, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, 2100);

      return () => clearTimeout(timer);
    }
  }, [trigger, onDismiss]);

  if (!visible) return null;

  const backgroundColor = type === "success" ? "bg-sky-400" : "bg-rose-300";
  const textColor = type === "success" ? "text-green-950" : "text-red-900";

  return (
    <div
      className={`fixed top-20 select-none bg-opacity-60 right-1 ${backgroundColor} ${textColor} p-4 rounded shadow-lg`}
    >
      {message}
    </div>
  );
}

export default Message;
