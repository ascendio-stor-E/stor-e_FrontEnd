import axios from "axios";
import { StoryStartResponse } from "../StoryStartResponse";
import { useNavigate } from "react-router-dom";

type HomeProps = {
  setInitialStoryOptions: (options: StoryStartResponse) => void
};

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  
  const getStarted = () => {
    axios
      .post<StoryStartResponse>('http://localhost:8080/api/story')
      .then(response => {
        console.log('Got response', response.data);
        props.setInitialStoryOptions(response.data);
        navigate('/create');
      })
      .catch(err => console.error('Cannot get started', err));
  };

  return (
    <>
      <section className="home">
        <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
        <br />
        <button className="home__create-button" onClick={getStarted}>Get Started</button>
      </section>
    </>
  );
};

export default Home;
