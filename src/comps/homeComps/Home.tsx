import axios from 'axios';
import Loading from '../loadingComps/Loading';
import { StoryStartResponse } from '../../types/StoryStartResponse';
import { useNavigate } from 'react-router-dom';
import { StoryBook } from '../../types/StoryBook';
import { useState } from 'react';
import { errorAlert } from '../../common/helpers/errorHandler';
import { errorMessages } from '../../common/constants/constants';
import { HomeLogo } from './homeLogo';

type HomeProps = {
  setCurrentStoryBook: (book: StoryBook) => void;
};

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const getStarted = () => {
    setIsLoading(true);

    axios
      .post<StoryStartResponse>(`${import.meta.env.VITE_BACKEND_URL}/api/story`)
      .then((response) => {
        setIsLoading(false);

        const storyBook: StoryBook = {
          storyBookId: response.data.storyBookId,
          conversationId: response.data.conversationId,
          coverImage: '',
          options: response.data.options,
          pages: [],
        };

        props.setCurrentStoryBook(storyBook);

        navigate('/create');
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, 'Cannot create initial story', err);
        setIsLoading(false);
      });};

  return (
    <>
      <section className="home">
        <HomeLogo />
        <br />
        <button className="home__create-button" onClick={getStarted}>
          Get Started
        </button>
      </section>
      {isLoading && <Loading />}
    </>
  );
};

export default Home;
