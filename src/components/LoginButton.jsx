
function LoginButton({ onClick }) {
  return (
    <button 
      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      onClick={onClick}
    >
      Login
    </button>
  );
}

export default LoginButton;
