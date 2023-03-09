import classes from "./Home.module.css";
import Search from "../components/Search";

const Home = () => {
  return (
    <section className={classes["open-weather"]}>
      <div className={classes["open-weather-container"]}>
        <>
          <p className={classes.title}>Enter a City and State</p>
          <Search />
        </>
      </div>
    </section>
  );
};

export default Home;
