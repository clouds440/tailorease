const Logo = ({ classes, fontSize }) => {
  return (
    <div className={`flex select-none items-center justify-center ${classes}`}>
      <a href="#home" className="flex">
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
        <h1 className={`font-bold ${fontSize} text-yellow-500 md:hidden`}>E</h1>
      </a>
    </div>
  );
};

export default Logo;
