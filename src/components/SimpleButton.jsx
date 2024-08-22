
function SimpleButton({ onClick, btnText, type, extraclasses }) {

  const primary = "bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 " + extraclasses;
  const cancel = "bg-gray-100 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 " + extraclasses;

  const style = type === "primary" ? primary : cancel;

  return (

    <button 
      className={`${style}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}

export default SimpleButton;