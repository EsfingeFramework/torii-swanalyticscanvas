import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequestHeaders } from "../header/useRequestHeaders";

export const useGetIssues = async (labels) => {
  const [loaded, setLoaded] = useState(false);
  const [issues, setIssues] = useState([]);
  const requestHeaders = useRequestHeaders("application/json");

  requestHeaders["params"] = { filter: "subscribed", labels: labels };

  const fetch = useCallback(() => {
    return axios
      .get(
        "https://enigmatic-reaches-35840.herokuapp.com/https://api.github.com/user/issues",
        requestHeaders
      )
      .then((response) => {
        setLoaded(false);
        setIssues(response.data);
      });
  }, [labels]);

  useEffect(() => {
    fetch();
  }, [labels]);

  return { issues };
};
