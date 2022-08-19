import React, { useEffect } from "react";
import { ReactComponent as CloseIcon } from "./../atoms/icons/close.svg";

const Popup = ({ children, className, center = true }) => {
  return (
    <div
      className={`${
        center
          ? " top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : ""
      }
     fixed p-4 gradient-border bg-gradient-dark-blue-black-50 rounded backdrop-filter backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
};

export default Popup;

export const PopupTitle = ({ children, className, icon, onClose }) => {
  return (
    <h2
      className={`${className} flex items-center pb-1.5 uppercase border-b-1 mb-1 font-bold text-xl border-prime-blue-20`}
      onKeyDown={(event) => event.preventDefault()}
    >
      {icon && <div className="w-2 h-2 mr-1">{icon}</div>}
      {children}{" "}
      {onClose && (
        <>
          <div className="flex-grow" />
          <button onClick={onClose}>
            <CloseIcon className="w-2 h-2 float-right inline-block filter hover:drop-shadow-white focus-within:drop-shadow-white" />
          </button>
        </>
      )}
    </h2>
  );
};
