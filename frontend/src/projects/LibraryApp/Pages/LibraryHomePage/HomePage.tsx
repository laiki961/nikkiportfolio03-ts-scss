import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";
import classes from "../Library.module.css";
// import { SearchBooksPage } from "../SearchBooksPage/SearchBooksPage";
// import { useOktaAuth } from "@okta/okta-react";

const HomePage = () => {
  // const { authState } = useOktaAuth();
  // console.log(authState);

  return (
    <section id={classes["library-section"]}>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
      {/* <SearchBooksPage /> */}
    </section>
  );
};

export default HomePage;
