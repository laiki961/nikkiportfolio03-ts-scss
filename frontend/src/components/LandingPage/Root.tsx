import { Security } from "@okta/okta-react";
import MainNavigation from "../MainNavigation/MainNavigation";

import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "../../lib/config";
import Footer from "../../components/Footer/Footer";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router";

// const oktaAuth = new OktaAuth(oktaConfig);

const RootLayout: React.FC = () => {
  //   const history = useHistory();

  //   const customAuthHandler = () => {
  //     history("/login");
  //   };

  //   const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
  //     console.log(originalUri);
  //     console.log(window.location.origin);
  //     history(toRelativeUrl(originalUri || "/", window.location.origin));
  //   };

  return (
    // <Security
    //   oktaAuth={oktaAuth}
    //   restoreOriginalUri={restoreOriginalUri}
    //   onAuthRequired={customAuthHandler}
    // >
    //   <MainNavigation />
    //   <main>
    //     <Outlet />
    //   </main>
    //   <Footer />
    // </Security>
    <></>
  );
};

export default RootLayout;
