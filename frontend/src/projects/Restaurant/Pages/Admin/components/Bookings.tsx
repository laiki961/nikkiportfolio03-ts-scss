import { AuthState } from "@okta/okta-auth-js";

type PropsType = {
  authState: AuthState | null;
};

const Bookings: React.FC<PropsType> = () => {
  return <>Today Bookings</>;
};

export default Bookings;
