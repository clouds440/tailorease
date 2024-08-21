import React, { useEffect, useState } from "react";

function Message({ message, type, trigger, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [trigger, onDismiss]);

  if (!visible) return null;

  const backgroundColor = type === "success" ? "bg-green-600" : "bg-rose-600";

  const onClose = () => {
    setVisible(false);
    onDismiss();
  }

  return (
      <div
        className={`fixed top-20 bg-opacity-60 right-1 px-5 py-1 rounded-2xl shadow-lg z-50 ${backgroundColor}`}
      >
    <div className="flex justify-around items-center select-none text-xl text-white">
      <div className="mr-3">{message}</div>
      <div>
        <strong 
          className="cursor-pointer text-2xl"
          onClick={onClose}>
          〤
        </strong>
      </div>
    </div>
  </div>
  );
}

export default Message;
