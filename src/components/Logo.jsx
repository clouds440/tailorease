import { Link } from "react-router-dom";
const Logo = ({ classes, fontSize }) => {
  return (
    <div
      dir="ltr"
      className={`flex select-none items-center justify-center ${classes}`}
    >
      <Link to={"/"}>
        <span className="flex">
          <h1
            className={`font-bold ${fontSize} text-cyan-600 hidden md:inline-block`}
          >
            Tailor
          </h1>
          <h1
            className={`font-bold ${fontSize} text-yellow-500 hidden md:inline-block`}
          >
            Ease
          </h1>
          <h1 className={`font-bold ${fontSize} text-cyan-600 md:hidden`}>T</h1>
          <h1 className={`font-bold ${fontSize} text-yellow-500 md:hidden`}>
            E
          </h1>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
