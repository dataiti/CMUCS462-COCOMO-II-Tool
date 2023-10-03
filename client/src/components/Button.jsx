import React from "react";
import { Link } from "react-router-dom";

const primaryStyle = "text-sm text-white transition-all";
const outlineStyle =
  "text-sm text-gray-400 border-2 border-gray-400 transition-all";

const Button = ({
  type = "",
  to = "",
  onClick = () => {},
  children,
  primary,
  outline,
  leftIcon,
  disable = false,
  className = "",
  props,
}) => {
  let Button = "button";

  const rest = {
    onClick: onClick,
    type: { type },
    ...props,
  };

  if (to) {
    Button = Link;
    rest.to = to;
  }

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  return (
    <Button
      className={`rounded-md font-bold min-h-[40px] flex items-center justify-center
        ${primary && `${primaryStyle}`} 
        ${outline && `${outlineStyle}`} ${className}`}
      {...rest}
    >
      {leftIcon && <div className="mr-2">{leftIcon}</div>}
      {<span className="">{children}</span>}
    </Button>
  );
};

export default Button;
