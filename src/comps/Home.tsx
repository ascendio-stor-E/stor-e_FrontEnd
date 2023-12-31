import axios from 'axios';
import Loading from './Loading';
import NameInputModal from './modals/NameInputModal';
import { StoryStartResponse } from '../types/StoryStartResponse';
import { useNavigate } from 'react-router-dom';
import { StoryBook } from '../types/StoryBook';
import { useState } from 'react';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';
import logoAnimated from './../assets/Stor-E_animated.gif';
import { stopNarration } from '../common/helpers/VoiceNarrator';
import Butterfly from './Butterfly';

type HomeProps = {
  setCurrentStoryBook: (book: StoryBook) => void;
  setCharacterName: (characterName: string) => void;
  characterName: string;
};

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  stopNarration();

  const getStarted = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!props.characterName) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    axios
      .post<StoryStartResponse>(`${import.meta.env.VITE_BACKEND_URL}/api/story?characterName=${props.characterName}`)
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
      });
  };

  const setCharacter = (event: { target: { value: string } }) => {
    props.setCharacterName(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Butterfly />
      <section className="home">
        <img className="home__logo" src={logoAnimated} alt="Stor-E Logo" />
        <h3 className="home__slogan">
          <strong>Create, Explore, Imagine...</strong>
        </h3>
        <br />
      </section>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form className="home__form">
            <label>
              <strong>
                Pick a name for your story's main character.
                <br />
                What about your own name, or maybe your best friend's?
              </strong>
              <br />
              <input className="create__name-input" type="text" name="name" onChange={setCharacter} />
            </label>
            <br />
            <button className="home__create-button" onClick={getStarted}>
              Get Started
            </button>
          </form>
        </>
      )}

      <NameInputModal show={showModal} onClose={handleModalClose} />
    </>
  );
};

export default Home;
