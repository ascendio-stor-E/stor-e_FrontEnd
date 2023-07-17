import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="home">
        <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
        <br />
        <Link to="/create">
          <button className="home__create-button">Get Started</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
