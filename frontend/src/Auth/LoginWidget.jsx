import { Redirect } from "react-router";
import { useOktaAuth } from "@okta/okta-react";
import Loading from "../components/Loading/Loading";
import OktaSignInWidget from "./OktaSigninWidget";

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  alert(
    "Normal User:\nUsername: testuser@gmail.com\nPassword: test1234!\n\nAdmin Feature: \nUsername: adminuser@email.com\nPassword: test1234!"
  );

  const onSuccess = async (tokens) => {
    console.log(`onSuccess`);
    console.log(tokens);
    await oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  if (!authState) {
    return <Loading />;
  }

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
