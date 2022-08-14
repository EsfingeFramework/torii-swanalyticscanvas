import axios from "axios";
import React, { createContext, useState, useCallback } from "react";
import { githubConfig } from "./../core/config/github.config";

const GithubAuthContext = createContext({});

const GithubAuthProvider = (props) => {
  const [token, setToken] = useState("");

  const getToken = useCallback(async (code) => {
    axios
      .post(
        "https://enigmatic-reaches-35840.herokuapp.com/https://github.com/login/oauth/access_token",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            client_id: githubConfig.CLIENT_ID,
            client_secret: githubConfig.SECRET_ID,
            code: code,
          },
        }
      )
      .then((response) => {
        setToken(response.data);
      });
  }, []);

  const githubAuthContextValue = {
    token,
    getToken,
  };

  return (
    <GithubAuthContext.Provider value={githubAuthContextValue} {...props} />
  );
};

const useGithubAuth = () => React.useContext(GithubAuthContext);

export { GithubAuthProvider, useGithubAuth };
