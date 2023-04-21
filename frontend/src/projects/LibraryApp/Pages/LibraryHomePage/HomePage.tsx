import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";
import classes from "../Library.module.css";

const HomePage = () => {
  return (
    <section id={classes["library-section"]} className=''>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </section>
  );
};

export default HomePage;
