import { Link } from "react-router-dom";
const Logo = ({ classes, fontSize }) => {
  return (
    <div
      dir="ltr"
      className={`flex select-none items-center justify-center ${classes}`}
    >
      <Link to={"/"}>
        <span className="flex">
          <h1 className={`font-bold ${fontSize} text-cyan-600`}>Tailor</h1>
          <h1 className={`font-bold ${fontSize} text-yellow-500`}>Ease</h1>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
