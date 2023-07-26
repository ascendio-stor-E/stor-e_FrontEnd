import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoryPageData } from '../types/StoryPageData';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Review = () => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const [storyPages, setStoryPages] = useState<StoryPageData[]>([]);
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const source = searchParams.get('source');

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}/stories`)
        .then((response) => {
          console.log('Got response', response.data);
          const sortedPages = response.data.sort((a: { pageNumber: number }, b: { pageNumber: number }) => a.pageNumber - b.pageNumber);

          setStoryPages(sortedPages);
          setPageNumber(sortedPages[0]?.pageNumber || 1);
        })
        .catch((err) => errorAlert(errorMessages.serverError, 'Cannot get stories for ' + storyBookId, err));
    };
    getData();

    const getTitle = () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}`)
        .then((response) => {
          setStoryTitle(response.data.title);
        })
        .catch((err) => console.error('Cannot review story', err));
    };
    getTitle();
  }, [storyBookId]);

  const handleConfirmClick = () => {
    navigate('/gallery');
  };

  const handleBackToGallery = () => {
    navigate('/gallery');
  };

  const handleStartAgain = () => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}`).catch((err) => errorAlert(errorMessages.cannotDelete, 'Cannot delete story book ' + storyBookId, err));
    navigate('/');
  };

  const returnToGalleryTooltip = (props: any) => <Tooltip {...props}>Return to Gallery</Tooltip>;
  const startAgainTooltip = (props: any) => <Tooltip {...props}>Start Again</Tooltip>;
  const confirmTooltip = (props: any) => <Tooltip {...props}>Confirm</Tooltip>;

  return (
    <section className="review">
      <h3 className="review__story-title">
        <strong>{storyTitle}</strong>
      </h3>
      <section>
        <Carousel
          interval={null}
          indicators={false}
          wrap={false}
          prevIcon={
            pageNumber === 1 ? null : (
              <button className="card-btn card-btn-arrow" onClick={() => handleBackToGallery}>
                <i className="bi bi-caret-left-fill review__carousel--arrow"></i>
              </button>
            )
          }
          nextIcon={
            pageNumber === storyPages.length ? null : (
              <button className="card-btn card-btn-arrow" onClick={() => handleBackToGallery}>
                <i className="bi bi-caret-right-fill review__carousel--arrow"></i>
              </button>
            )
          }
          onSelect={(selectedIndex) => {
            setPageNumber(storyPages[selectedIndex]?.pageNumber || 1);
          }}
        >
          {storyPages.map((page) => (
            <Carousel.Item key={page.id}>
              <div className="review__story">
                <img className="review__image" src={`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${page.image}`} alt="Story Image" />
                <p className="review__text">{page.textContent}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <br />
      <span className="review__pageNumber">Page {pageNumber}</span>
      <p></p>

      <div className="review_button-pane">
        {source === 'create' && (
          <OverlayTrigger placement="bottom" overlay={startAgainTooltip}>
            <button className="card-btn card-btn-start-again" onClick={() => handleStartAgain()}>
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </OverlayTrigger>
        )}

        {source === 'create' && (
          <OverlayTrigger placement="bottom" overlay={confirmTooltip}>
            <button className="card-btn card-btn-save" onClick={() => handleConfirmClick()}>
              <i className="bi bi-check2"></i>
            </button>
          </OverlayTrigger>
        )}

        {source === 'gallery' && (
          <OverlayTrigger placement="bottom" overlay={returnToGalleryTooltip}>
            <button className="card-btn card-btn-return" onClick={() => handleBackToGallery()}>
              <i className="bi bi-arrow-return-left"></i>
            </button>
          </OverlayTrigger>
        )}
      </div>
    </section>
  );
};

export default Review;
