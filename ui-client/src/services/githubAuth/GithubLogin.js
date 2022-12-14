import React, { useEffect } from "react";
import { useGithubAuth } from "../../context/GithubAuthContext";
import { githubConfig } from "../../core/config/github.config";

import PopupWindow from "./models/PopupWindow";
import { toQuery } from "./../../core/utils/github.util";

const popupHeight = 650;
const popupWidth = 500;

const GithubLogin = (props) => {
  const { onFailure, onSuccess, disabled = false } = props;
  const { token, getToken, istoken } = useGithubAuth();

  useEffect(() => {
    console.log("token is:", token);
  }, [token, istoken]);

  const handleSuccess = (data) => {
    if (!data.code) {
      return handleFailure(new Error("'code' not found"));
    }

    onSuccess(data);
    getToken(data.code);
  };

  const handleFailure = (error) => {
    onFailure(error);
  };

  const handleButtonClick = () => {
    const search = toQuery({
      client_id: githubConfig.CLIENT_ID,
      scope: githubConfig.SCOPE,
      redirect_uri: githubConfig.REDIRECT_URI,
    });

    const top =
      window.top.outerHeight / 2 + window.top.screenY - popupHeight / 2;
    const left =
      window.top.outerWidth / 2 + window.top.screenX - popupWidth / 2;

    const popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      {
        height: popupHeight,
        width: popupWidth,
        top: top,
        left: left,
      }
    );

    popup.then(
      (data) => handleSuccess(data),
      (error) => handleFailure(error)
    );
  };

  return (
    <button disabled={disabled} className="" onClick={handleButtonClick}>
      Connect to Github
    </button>
  );
};

export default GithubLogin;
