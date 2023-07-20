import axios from "axios";
import { StoryContinueResponse } from "../StoryContinueResponse";
import { useNavigate } from "react-router-dom";
import { StoryBook } from "../StoryBook";
import { StoryPageType } from "../StoryPageType";

type CreateProps = {
  currentStoryBook: StoryBook | undefined;
};


const Create = (props: CreateProps) => {
  let selectedOption = -1;
  const navigate = useNavigate();
  
  const createStory = () => {
    
    axios
      .post<StoryContinueResponse>(`http://localhost:8080/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${props.currentStoryBook?.conversationId}&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=1`)
      .then(response => {
        console.log('Got response', response.data);
        const storyPage :StoryPageType = {    
            part: response.data.part,
            story: response.data.story,
            options: response.data.options,
            image: response.data.imageName,
        }
        props.currentStoryBook?.pages.push(storyPage) 
        navigate('/storypage/1');
      })
      .catch(err => console.error('Cannot create story', err));
  };

  const optionSelected = (event: any) => {
    selectedOption = event.target.value;
  };
  
  return (
    <>
      <section className="create">
        <img
          className="create__image"
          src="./src/assets/Ascendio Logo.png"
          alt="Dummy Ascendio Logo"
        />
        <p className="create__intro-text">
          Welcome to Stor-E, your very own unique adventure generator. Choose the option that you
          want to explore and we can begin!
        </p>
        <form>
          <label>
            What is the name of our hero or heroine? <br />
            <input className="create__name-input" type="text" name="name" />
          </label>
          <br />
          <ul className="create__options-list" onChange={optionSelected}>
            {(props.currentStoryBook?.options || []).map(
              (option, index) => (
                <li key={'option' + index}>
                  <input
                    type="radio"
                    name="option"
                    value={index+1}
                    id={'option' + index}
                  />
                  <label htmlFor={"option" + index}> {option}</label>
                </li>
              )
            )}
          </ul>
        </form>
        <button className="create__button">Random</button>
        <button className="create__button" onClick={createStory} >Create</button>
      </section>
    </>
  );
};

export default Create;
