import axios from 'axios';
import Loading from './loadingComp/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryContinueResponse } from '../types/StoryContinueResponse';
import { StoryBook } from '../types/StoryBook';
import { StoryPageType } from '../types/StoryPageType';
import { StoryRandomResponse } from '../types/StoryRandomResponse';

type CreateProps = {
  currentStoryBook: StoryBook | undefined;
};

const Create = (props: CreateProps) => {
  let selectedOption = -1;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createStory = () => {
    setIsLoading(true);

    axios
      .post<StoryContinueResponse>(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${props.currentStoryBook?.conversationId}&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=1`)
      .then((response) => {
        setIsLoading(false);

        console.log('Got response', response.data);
        const storyPage: StoryPageType = {
          part: response.data.part,
          story: response.data.story,
          options: response.data.options,
          image: response.data.imageName,
          storyId: response.data.storyId
        };
        props.currentStoryBook?.pages.push(storyPage);
        navigate('/storypage/1');
      })
      .catch((err) => {
        console.error('Cannot create story.', err);
        setIsLoading(false);
      });
  };

  const createRandomStory = () => {
    setIsLoading(true);

    axios
      .post<StoryRandomResponse>(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/randomStory?storyBookId=${props.currentStoryBook?.storyBookId}&option=${props.currentStoryBook?.options[selectedOption - 1]}`)
      .then((response) => {
        setIsLoading(false);
        console.log('Got response', response.data);
        if (props.currentStoryBook) {
          props.currentStoryBook.pages = response.data.stories.map((singleStory) => {
            const page = {
              part: singleStory.part,
              story: singleStory.story,
              options: singleStory.options,
              image: singleStory.imageName,
            };
            return page;
          });
        }
        console.log(props.currentStoryBook);
        navigate(`/review/${props.currentStoryBook?.storyBookId}`);
      })
      .catch((err) => {
        console.error('Cannot create story', err);
        setIsLoading(false);
      });
  };

  const optionSelected = (event: any) => {
    selectedOption = event.target.value;
  };

  return (
    <>
      <section className="create">
        <img className="create__image" src="./src/assets/Store-E Logo V2.png" alt="Stor-E Logo" />
        <p className="create__intro-text">Welcome to Stor-E, your very own unique adventure generator. Choose the option that you want to explore and we can begin!</p>
        <form>
          <label>
            What is the name of our hero or heroine? <br />
            <input className="create__name-input" type="text" name="name" />
          </label>
          <br />
          <ul className="create__options-list" onChange={optionSelected}>
            {(props.currentStoryBook?.options || []).map((option, index) => (
              <li key={`option${index}`}>
                <input type="radio" name="option" value={index + 1} id={`option${index}`} />
                <label htmlFor={`option${index}`}> {option}</label>
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
