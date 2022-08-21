import axios from "axios";
import React, { createContext, useState, useCallback } from "react";
import { useRequestHeaders } from "../api/header/useRequestHeaders";
import { githubConfig } from "./../core/config/github.config";
import { getTokenAccess } from "./../core/utils/string.util";

const GithubAuthContext = createContext({});

const GithubAuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [isToken, setIstoken] = useState(false);

  const [issues, setIssues] = useState([]);

  const fetchIssues = useCallback((labels, auth) => {
    const requestHeaders = {
      headers: {
        Authorization: "Token " + auth,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    requestHeaders["params"] = { filter: "subscribed", labels: labels };
    axios
      .get(
        "https://enigmatic-reaches-35840.herokuapp.com/https://api.github.com/user/issues",
        requestHeaders
      )
      .then((response) => {
        setIssues(response.data);
      });
  }, []);

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
        setIstoken(true);
        setToken(getTokenAccess(response.data));
      });
  }, []);

  const githubAuthContextValue = {
    token,
    getToken,
    isToken,
    fetchIssues,
    issues,
  };

  return (
    <GithubAuthContext.Provider value={githubAuthContextValue} {...props} />
  );
};

const useGithubAuth = () => React.useContext(GithubAuthContext);

export { GithubAuthProvider, useGithubAuth };
