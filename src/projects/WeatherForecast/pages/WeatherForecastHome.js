import Search from "../components/Search";

const Home = () => {
  return (
    <section className='weather__open-weather'>
      <div className='weather__main'>
        <>
          <p className='weather__title'>Enter a City and State</p>
          <Search />
        </>
      </div>
    </section>
  );
};

export default Home;
