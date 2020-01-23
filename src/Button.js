import React from "react";
const Button = ({ onClickFunction, children, className }) => {
  return (
    <div onClick={onClickFunction} className={className}>
      {children}
    </div>
  );
};

export default Button;
