import { useContext } from "react";
import AdminContext from "../projects/Restaurant/Store/AdminProvider";
import { UseAdminContextType } from "../projects/Restaurant/Store/AdminProvider";

const useAdmin = (): UseAdminContextType => {
  return useContext(AdminContext);
};

export default useAdmin;
