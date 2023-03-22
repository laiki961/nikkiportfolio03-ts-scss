import { useState } from "react";
import useCart from "../../../../hooks/useCart";
import Search from "../../components/Search/Search";

import { MenuList } from "./components/MenuList";

const Menu = () => {
  // const [showToast, setShowToast] = useState<boolean>(false);
  // const { showToast: isShowToast } = useCart;

  return (
    <section className='restaurant-menu container-sm min-vh-100 py-5'>
      <div className='restaurant-menu__header'>
        <span className='restaurant-menu__heading'>Meun Selection</span>
        <Search className='restaurant-menu__search' />
      </div>
      <MenuList />
    </section>
  );
};

export default Menu;
