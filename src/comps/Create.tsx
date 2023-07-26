import axios from 'axios';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryContinueResponse } from '../types/StoryContinueResponse';
import { StoryBook } from '../types/StoryBook';
import { StoryPageType } from '../types/StoryPageType';
import { StoryRandomResponse } from '../types/StoryRandomResponse';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';
import OptionSelectModal from './modals/OptionSelectModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import storELogo from '../assets/Store-E_Logo_V2.png';
import narrateStory from '../common/helpers/VoiceNarrator';

type CreateProps = {
  currentStoryBook: StoryBook | undefined;
};

const Create = (props: CreateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [narrate, _] = useState(true);
  const welcomeMessage: string =  'Welcome to Stor-E, your very own unique adventure generator. Choose the option that you want to explore and we can begin!';

  useEffect(() => narrateStory(welcomeMessage), [ narrate ]);

  const createStory = (selectedOption: number) => {
    setIsLoading(true);
    axios
      .post<StoryContinueResponse>(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${
          props.currentStoryBook?.conversationId
        }&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=1`
      )
      .then((response) => {
        setIsLoading(false);

        const storyPage: StoryPageType = {
          part: response.data.part,
          story: response.data.story,
          options: response.data.options,
          image: response.data.imageName,
          storyId: response.data.storyId,
        };
        props.currentStoryBook?.pages.push(storyPage);
        navigate("/storypage/1");
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, "Cannot create story", err);
        setIsLoading(false);
      });
  };

  const createRandomStory = () => {
    const selectedOption = Math.ceil(Math.random() * 3);

    setIsLoading(true);

    axios
      .post<StoryRandomResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/story/randomStory?storyBookId=${
          props.currentStoryBook?.storyBookId
        }&option=${props.currentStoryBook?.options[selectedOption - 1]}`
      )
      .then((response) => {
        setIsLoading(false);

        if (props.currentStoryBook) {
          props.currentStoryBook.pages = response.data.stories.map((singleStory) => {
            const page = {
              part: singleStory.part,
              story: singleStory.story,
              options: singleStory.options,
              image: singleStory.imageName,
              storyId: singleStory.storyId,
            };
            return page;
          });
        }
        navigate(`/review/${props.currentStoryBook?.storyBookId}?source=create`);
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, "Cannot create random story", err);
        setIsLoading(false);
      });
  };

  const handleOptionClick = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createStory(index + 1);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const createRandomStoryTooltip = (props: any) => (
    <Tooltip {...props}>Create Random Story</Tooltip>
  );

  return (
    <>
      <section className="create">
        <img className="create__image" src={storELogo} alt="Stor-E Logo" />
        <p className="create__intro-text">{ welcomeMessage }</p>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <form>
              <ul className="create__options-list">
                {(props.currentStoryBook?.options || []).map((option, index) => (
                  <li key={`option${index}`}>
                    <button className={`create__option-button create__option-button--${index}`} onClick={handleOptionClick(index)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </form>
            <OverlayTrigger placement="bottom" overlay={createRandomStoryTooltip}>
              <button
                className="card-btn card-btn-random-story"
                onClick={() => createRandomStory()}
              >
                <i className="bi bi-shuffle"></i>
              </button>
            </OverlayTrigger>
          </>
        )}
      </section>

      <OptionSelectModal show={showModal} onClose={handleModalClose} />
    </>
  );
};

export default Create;
