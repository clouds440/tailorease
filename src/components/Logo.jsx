const Logo = ({ classes, fontSize }) => {
  return (
    <div className={`flex select-none items-center justify-center ${classes}`}>
      <a href="#home" className="flex">
        <h1 className={`font-bold ${fontSize} text-cyan-600`}>
          T<span className="hidden md:inline-block">ailor</span>
        </h1>
        <h1 className={`font-bold ${fontSize} text-yellow-500`}>
          E<span className="hidden md:inline-block">ase</span>
        </h1>
      </a>
    </div>
  );
};

export default Logo;
