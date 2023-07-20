import { useNavigate, useParams } from "react-router-dom";
import { StoryBook } from "../types/StoryBook";
import { StoryPageType } from "../types/StoryPageType";
import axios from "axios";
import { StoryContinueResponse } from "../types/StoryContinueResponse";

type StoryPageProps = {
  currentStoryBook: StoryBook | undefined;
};

export default function StoryPage(props: StoryPageProps) {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  let selectedOption = -1;
  const newPageNumber: number = Number(pageNumber) + 1;
  const nextPage = () => {
    axios
      .post<StoryContinueResponse>(
        `https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${props.currentStoryBook?.conversationId}&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=${newPageNumber}`
      )
      .then((response) => {
        console.log("Got response", response.data);
        const storyPage: StoryPageType = {
          part: response.data.part,
          story: response.data.story,
          options: response.data.options,
          image: response.data.imageName
        };
        props.currentStoryBook?.pages.push(storyPage);

        navigate(`/storypage/${newPageNumber}`);
      })
      .catch((err) => console.error("Cannot create story", err));
  };

  const optionSelected = (event: any) => {
    selectedOption = event.target.value;
  };

  const currentPage = props.currentStoryBook?.pages[props.currentStoryBook?.pages.length - 1];

  return (
    <>
      <section className="create">
        <img
          className="create__image"
          src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${currentPage?.image}`}
          alt="Dummy Ascendio Logo"
        />
        <p className="create__intro-text">{currentPage?.story}</p>
        <form>
          <ul className="create__options-list" onChange={optionSelected}>
            {(currentPage?.options || []).map((option, index) => (
              <li key={`option${index}`}>
                <input type="radio" name="option" value={index+1} id={`option${index}`} defaultChecked={false}/>
                <label htmlFor={`option${index}`}> {option}</label>
              </li>
            ))}
          </ul>
        </form>
        {
        (currentPage && currentPage.options.length !== 0) ? (
        
        <button className="create__button" onClick={nextPage}>
          Next Page
        </button>

        ) : (
          <>
          <button className="create__button" onClick={() => navigate("/")}>
          Start Again
        </button>
          <button className="create__button" onClick={() => navigate("/review")}>
          Review
        </button>
        </>
        )
        }
      </section>
    </>
  );
}
