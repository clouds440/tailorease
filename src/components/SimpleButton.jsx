function SimpleButton({ onClick, btnText, type, extraclasses = "" }) {
  const primary =
    "bg-sky-500 bg-opacity-55 text-white px-4 py-1 rounded hover:bg-opacity-45 " +
    extraclasses;
  const cancel =
    "bg-gray-100 opacity-85 text-gray-800 px-4 py-1 rounded hover:bg-opacity-75 " +
    extraclasses;

  const style = type === "primary" ? primary : cancel;

  return (
    <button
      type={type === "primary" ? "submit" : "button"} // Assigning type attribute
      className={`${style}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}

export default SimpleButton;
