// import { useRouteError } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MainNavigation from "../MainNavigation/MainNavigation";
import PageContent from "../PageContent/PageContent";

function ErrorPage() {
  // const error: any = useRouteError();
  const [error, setError] = useState<string>("");
  const history = useHistory();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  useEffect(() => {
    const unlisten = history.listen(() => {
      setError("");
    });

    return () => {
      unlisten();
    };
  }, [history]);

  // if (error.status === 500) {
  //   message = error.data.message;
  // }

  // if (error.status === 404) {
  //   title = "Not found!";
  //   message = "Could not find resource or page.";
  // }

  const handleError = (err: any) => {
    setError(title);
    history.replace("/error");
  };

  return (
    <>
      {/* <MainNavigation /> */}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
