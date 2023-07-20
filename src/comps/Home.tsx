import axios from "axios";
import { StoryStartResponse } from "../types/StoryStartResponse";
import { useNavigate } from "react-router-dom";
import { StoryBook } from "../types/StoryBook";

type HomeProps = {
  setCurrentStoryBook: (book: StoryBook) => void
};

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  
  const getStarted = () => {
    axios
      .post<StoryStartResponse>('https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story')
      .then(response => {
        console.log('Got response', response.data);
        
        const storyBook: StoryBook = {
          storyBookId : response.data.storyBookId,
          conversationId: response.data.conversationId,
          coverImage: "",
          options: response.data.options,
          pages: []
        }

        props.setCurrentStoryBook(storyBook);
    
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
