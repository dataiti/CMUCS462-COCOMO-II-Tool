import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen fixed z-10 top-0 left-0 bg-opacity">
      <div className="lds-ripple absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
