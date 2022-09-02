import React from "react";
import Popup, { PopupTitle } from "../atoms/Popup";

const GithubIssuePopup = ({ onClose }) => {
  return (
    <Popup className="sm:w-10/12 md:w-94 lg:w-64">
      <PopupTitle onClose={onClose}>Get help</PopupTitle>
    </Popup>
  );
};

export default GithubIssuePopup;
