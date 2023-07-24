import axios from 'axios';
import Loading from './Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryContinueResponse } from '../types/StoryContinueResponse';
import { StoryBook } from '../types/StoryBook';
import { StoryPageType } from '../types/StoryPageType';
import { StoryRandomResponse } from '../types/StoryRandomResponse';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';

type CreateProps = {
  currentStoryBook: StoryBook | undefined;
};

const Create = (props: CreateProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createStory = () => {
    if (selectedOption === null) {
      alert('Please select an option.');
      return;
    }

    setIsLoading(true);
    axios
      .post<StoryContinueResponse>(`${import.meta.env.VITE_BACKEND_URL}/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${props.currentStoryBook?.conversationId}&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=1`)
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
        navigate('/storypage/1');
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, 'Cannot create story', err);
        setIsLoading(false);
      });
  };

  const createRandomStory = () => {
    if (selectedOption === null) {
      setSelectedOption(Math.ceil(Math.random() * 3));
      return;
    }

    setIsLoading(true);

    axios
      .post<StoryRandomResponse>(`${import.meta.env.VITE_BACKEND_URL}/api/story/randomStory?storyBookId=${props.currentStoryBook?.storyBookId}&option=${props.currentStoryBook?.options[selectedOption - 1]}`)
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
        navigate(`/review/${props.currentStoryBook?.storyBookId}`);
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, 'Cannot create random story', err);
        setIsLoading(false);
      });
  };

  const handleOptionClick = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOption(index + 1);
  };

  return (
    <>
      <section className="create">
        <img className="create__image" src="./src/assets/Store-E Logo V2.png" alt="Stor-E Logo" />
        <p className="create__intro-text">Welcome to Stor-E, your very own unique adventure generator. Choose the option that you want to explore and we can begin!</p>
        <form>
          <ul className="create__options-list">
            {(props.currentStoryBook?.options || []).map((option, index) => (
              <li key={`option${index}`}>
                <button className={`create__option-button${selectedOption === index + 1 ? ' create__option-button-selected' : ''}`} onClick={handleOptionClick(index)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </form>
        {isLoading && <Loading />}
        <button className="create__button" onClick={createRandomStory}>
          Random
        </button>
        <button className="create__button" onClick={createStory}>
          Create
        </button>
      </section>
    </>
  );
};

export default Create;
