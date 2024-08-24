const svgProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  strokeWidth: "2",
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const EditIcon = ({ size, color, extraClasses }) => (
  <svg {...svgProps} className={`h-${size} w-${size} ${color} ${extraClasses}`}>
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
    <line x1="16" y1="5" x2="19" y2="8" />
  </svg>
);

const SettingsIcon = ({ size, color, extraClasses }) => (
  <svg {...svgProps} className={`h-${size} w-${size} ${color} ${extraClasses}`}>
    {" "}
    <circle cx="12" cy="12" r="3" />{" "}
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = ({ size, color, extraClasses }) => (
  <svg {...svgProps} className={`h-${size} w-${size} ${color} ${extraClasses}`}>
    {" "}
    <path stroke="none" d="M0 0h24v24H0z" />{" "}
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
    <path d="M7 12h14l-3 -3m0 6l3 -3" />
  </svg>
);

const MenuIcon = ({ size, color, extraClasses }) => (
  <svg {...svgProps} className={`h-${size} w-${size} ${color} ${extraClasses}`}>
    {" "}
    <path d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

export { EditIcon, SettingsIcon, LogoutIcon, MenuIcon };
