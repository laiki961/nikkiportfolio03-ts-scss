import Search from "../../components/Search/Search";

import { MenuList } from "./components/MenuList";

const Menu = () => {
  return (
    <section className='restaurant-menu container-sm min-vh-100 py-5 text-2'>
      <div className='restaurant-menu__header'>
        <span className='restaurant-menu__heading'>Meun Selection</span>
        <Search className='restaurant__search' />
      </div>
      <MenuList />
    </section>
  );
};

export default Menu;
