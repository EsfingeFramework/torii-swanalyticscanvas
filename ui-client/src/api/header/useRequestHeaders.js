import { useGithubAuth } from "../../context/GithubAuthContext";

export const useRequestHeaders = (contentType) => {
  const { token } = useGithubAuth();
  return {
    headers: {
      Authorization: "Token " + token,
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};
