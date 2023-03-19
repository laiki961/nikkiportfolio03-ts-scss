import { useState } from "react";
import { MenuList } from "./components/MenuList";

const Menu = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  return (
    <section className='restaurant-menu container-sm min-vh-100'>
      <div className='restaurant__menu heading-2'>Meun Selection</div>
      <MenuList />
    </section>
  );
};

export default Menu;
