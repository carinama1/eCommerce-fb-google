import React from "react";

const Logo = (props) => {
  return (
    <div>
      <img
        style={{ width: 48, height: 48, position: "center" }}
        alt="Logo"
        src="/static/soloQ.png"
        {...props}
      />
    </div>
  );
};

export default Logo;
