import { useNavigate, useParams } from "react-router-dom";
import { StoryBook } from "../types/StoryBook";
import { StoryPageType } from "../types/StoryPageType";
import axios from "axios";
import Loading from "./loadingComp/Loading";
import spinner from "../assets/Spinner.gif";
import { StoryContinueResponse } from "../types/StoryContinueResponse";
import { useEffect, useState } from "react";
import { StoryPageData } from "../types/StoryPageData";
import Typewriter from "typewriter-effect";

type StoryPageProps = {
  currentStoryBook: StoryBook | undefined;
};

export default function StoryPage(props: StoryPageProps) {
  const { pageNumber } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [storyImage, setStoryImage] = useState<string>(spinner);
  const navigate = useNavigate();
  let selectedOption = -1;
  const newPageNumber: number = Number(pageNumber) + 1;

  const nextPage = () => {
    setIsLoading(true);

    axios
      .post<StoryContinueResponse>(
        `https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${props.currentStoryBook?.conversationId}&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=${newPageNumber}`
      )
      .then((response) => {
        setIsLoading(false);
        setStoryImage(spinner);

        console.log("Got response", response.data);
        const storyPage: StoryPageType = {
          part: response.data.part,
          story: response.data.story,
          options: response.data.options,
          image: response.data.imageName,
          storyId: response.data.storyId,
        };
        props.currentStoryBook?.pages.push(storyPage);

        navigate(`/storypage/${newPageNumber}`);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Cannot create story", err);
      });
  };

  const optionSelected = (event: any) => {
    selectedOption = event.target.value;
  };

  const currentPage = props.currentStoryBook?.pages[props.currentStoryBook?.pages.length - 1];

  const handleReviewClick = () => {
    if (props.currentStoryBook?.storyBookId) {
      navigate(`/review/${props.currentStoryBook?.storyBookId}`);
    }
  };

  const getStoryImage = (retry: number, sleepMs: number) => {
    if (currentPage?.image || retry === 0) {
      setStoryImage(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${currentPage?.image}`);
      return;
    }

    axios
      .get<StoryPageData>(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/${currentPage?.storyId}`)
      .then((response) => {
        if (!response.data.image) {
          setTimeout(() => getStoryImage(retry - 1, sleepMs), sleepMs);
        } else if (currentPage) {
          currentPage.image = response.data.image;
          setStoryImage(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${currentPage.image}`);
        }
      });
  };

  useEffect(() => getStoryImage(10, 2000), [currentPage]);

  return (
    <>
      <section className="create">
        <img className="create__image" src={storyImage} alt="Stor-E Image " />
        <p className="create__intro-text">
        <Typewriter
          options={{
            strings: currentPage?.story,
            autoStart: true,
            loop: false,
            delay: 100
          }}
        />
        </p>
        <form>
          <ul className="create__options-list" onChange={optionSelected}>
            {(currentPage?.options || []).map((option, index) => (
              <li key={`option${index}`}>
                <input
                  type="radio"
                  name="option"
                  value={index + 1}
                  id={`option${index}`}
                  defaultChecked={false}
                />
                <label htmlFor={`option${index}`}> {option}</label>
              </li>
            ))}
          </ul>
        </form>
        {isLoading && <Loading />}
        {currentPage && currentPage.options?.length !== 0 ? (
          <button className="create__button" onClick={nextPage}>
            Next Page
          </button>
        ) : (
          <>
            <button className="create__button" onClick={() => navigate("/")}>
              Start Again
            </button>
            <button className="create__button" onClick={handleReviewClick}>
              Review
            </button>
          </>
        )}
      </section>
    </>
  );
}
