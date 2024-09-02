function SimpleButton({
  onClick,
  btnText,
  type,
  extraclasses = "",
  icon = null,
}) {
  const primary =
    "bg-sky-500 bg-opacity-80 text-white hover:bg-opacity-60 " + extraclasses;
  const simple =
    "bg-gray-100 text-black opacity-85 text-gray-800 hover:bg-opacity-75 " +
    extraclasses;
  const danger = "bg-red-600 text-white hover:bg-opacity-55 " + extraclasses;

  let style;
  switch (type) {
    case "primary":
    case "primary-submit":
      style = primary;
      break;
    case "danger":
      style = danger;
      break;
    default:
      style = simple;
  }

  return (
    <button
      type={type === "primary-submit" ? "submit" : "button"}
      className={`${style} flex items-center justify-center px-4 py-1 rounded duration-500`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {btnText}
    </button>
  );
}

export default SimpleButton;
