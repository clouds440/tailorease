const Logo = ({ classes, fontSize }) => {
  return (
    <div className={`flex ${classes} select-none`}>
      <a href="#home" className="flex">
        <h1 className={`font-bold ${fontSize} ml-2 text-cyan-600`}>Tailor</h1>
        <h1 className={`font-bold ${fontSize} text-yellow-500`}>Ease</h1>
      </a>
    </div>
  );
};

export default Logo;
