import { Security } from "@okta/okta-react";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../MainNavigation/MainNavigation";

import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "../../lib/config";
import Footer from "../../components/Footer/Footer";
import Loading from "../Loading/Loading";

const oktaAuth = new OktaAuth(oktaConfig);

const RootLayout: React.FC = () => {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={customAuthHandler}
    >
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Security>
  );
};

export default RootLayout;
