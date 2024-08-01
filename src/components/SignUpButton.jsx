
function SignUpButton({ onClick }) {
  return (
    <button 
      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      Sign Up
    </button>
  );
}

export default SignUpButton;