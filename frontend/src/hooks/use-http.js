import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status}: ${response.statusText}`
        );
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      console.log(error);
      setError(error.message || `Something went wrong`);
    }
    setIsLoading(false);
  }, []);

  const resetErrorHandler = () => {
    setError(false);
  };

  return {
    isLoading,
    error,
    resetErrorHandler,
    sendRequest,
  };
};
export default useHttp;
