import Search from "../../components/Search/Search";

import { MenuList } from "./components/MenuList";

const Menu = () => {
  return (
    <section className='restaurant-menu container-sm py-5'>
      <div className='restaurant-menu__header'>
        <span className='restaurant-menu__heading'>Meun Selection</span>
        <Search className='restaurant__search' />
      </div>
      <MenuList />
    </section>
  );
};

export default Menu;
