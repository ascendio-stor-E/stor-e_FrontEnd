import { useNavigate, useParams } from "react-router-dom";
import { StoryBook } from "../types/StoryBook";
import { StoryPageType } from "../types/StoryPageType";
import axios from "axios";
import Loading from "./Loading";
import OptionSelectModal from "./modals/OptionSelectModal";
import painting from "../assets/Painting.gif";
import { StoryContinueResponse } from "../types/StoryContinueResponse";
import { useEffect, useState } from "react";
import { StoryPageData } from "../types/StoryPageData";
import Typewriter from "typewriter-effect";
import { errorAlert } from "../common/helpers/errorHandler";
import { errorMessages } from "../common/constants/constants";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

type StoryPageProps = {
  currentStoryBook: StoryBook | undefined;
};

export default function StoryPage(props: StoryPageProps) {
  const { pageNumber } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [storyImage, setStoryImage] = useState<string>(painting);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const newPageNumber: number = Number(pageNumber) + 1;

  const nextPage = (selectedOption: number) => {
    setIsLoading(true);
    axios
      .post<StoryContinueResponse>(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/story/continueStory?optionChoice=${selectedOption}&conversationId=${
          props.currentStoryBook?.conversationId
        }&storyBookId=${props.currentStoryBook?.storyBookId}&pageNumber=${newPageNumber}`
      )
      .then((response) => {
        setIsLoading(false);
        setStoryImage(painting);

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
        errorAlert(errorMessages.serverError, "Cannot create story", err);
      });
  };

  const handleOptionClick = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nextPage(index + 1);
  };

  const currentPage = props.currentStoryBook?.pages[props.currentStoryBook?.pages.length - 1];

  const handleReviewClick = () => {
    if (props.currentStoryBook?.storyBookId) {
      navigate(`/review/${props.currentStoryBook?.storyBookId}?source=create`);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getStoryImage = (retry: number, sleepMs: number) => {
    if (currentPage?.image || retry === 0) {
      setStoryImage(`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${currentPage?.image}`);
      return;
    }

    axios
      .get<StoryPageData>(`${import.meta.env.VITE_BACKEND_URL}/api/story/${currentPage?.storyId}`)
      .then((response) => {
        if (!response.data.image) {
          setTimeout(() => getStoryImage(retry - 1, sleepMs), sleepMs);
        } else if (currentPage) {
          currentPage.image = response.data.image;
          setStoryImage(
            `${import.meta.env.VITE_BACKEND_URL}/api/story/image/${currentPage.image}`
          );
        }
      })
      .catch((err) =>
        errorAlert(
          errorMessages.serverError,
          "Cannot load image of story " + currentPage?.storyId,
          err
        )
      );
  };

  useEffect(() => getStoryImage(15, 2000), [currentPage]);

  const reviewTooltip = (props: any) => <Tooltip {...props}>Review</Tooltip>;

  return (
    <>
      <section className="create">
        <div className="image__story">
          <img className="create__image" src={storyImage} alt="Stor-E Image " />

          <Typewriter
            options={{
              strings: currentPage?.story,
              wrapperClassName: "story_text",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <br></br>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {currentPage && currentPage.options?.length !== 0 ? (
              <>
                <label>Please select one of the following options:</label>
                <br></br>
                <form>
                  <ul className="create__options-list">
                    {(currentPage?.options || []).map((option, index) => (
                      <li key={`option${index}`}>
                        <button
                          className="create__option-button"
                          onClick={handleOptionClick(index)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </form>
              </>
            ) : (
              <>
                <OverlayTrigger placement="bottom" overlay={reviewTooltip}>
                  <button className="card-btn card-btn-review" onClick={() => handleReviewClick()}>
                    <i className="bi bi-eye"></i>
                  </button>
                </OverlayTrigger>
              </>
            )}
          </>
        )}
      </section>

      <OptionSelectModal show={showModal} onClose={handleModalClose} />
    </>
  );
}
