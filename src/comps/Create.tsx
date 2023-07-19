import axios from "axios";
import { StoryStartResponse } from "../StoryStartResponse";
import { StoryContinueResponse } from "../StoryContinueResponse";

type CreateProps = {
  initialStoryOptions: StoryStartResponse | undefined;
};

const Create = (props: CreateProps) => {
  let selectedOption = -1;

  const createStory = () => {
    axios
      .post<StoryContinueResponse>(`http://localhost:8080/api/story/continueStory?optionchoice=${selectedOption}&conversationId=${props.initialStoryOptions?.conversationId}&storyBookId=${props.initialStoryOptions?.storyBookId}&pageNumber=1`)
      .then(response => {
        console.log('Got response', response.data);
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
            {(props.initialStoryOptions?.options || ["option1", "option2", "option3"]).map(
              (option, index) => (
                <li key={'option' + index}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
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
