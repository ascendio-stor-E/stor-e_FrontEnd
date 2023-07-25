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

  const handleDeleteClick = () => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}`).catch((err) => errorAlert(errorMessages.cannotDelete, 'Cannot delete story book ' + storyBookId, err));
    navigate(`/`);
  };

  const handleSaveClick = () => {
    navigate('/gallery');
  };

  const handleBackToGallery = () => {
    navigate('/gallery');
  };

  const returnToGalleryTooltip = (props: any) => <Tooltip {...props}>Return to Gallery</Tooltip>;

  return (
    <section>
      <h3 className="review__story-title">
        <strong>{storyTitle}</strong>
      </h3>
      <Carousel
        interval={null}
        indicators={false}
        wrap={false}
        prevIcon={pageNumber === 1 ? null : <img className="review__carousel--arrow" src="../src/assets/arrowLeft.png" alt="Prev" />}
        nextIcon={pageNumber === storyPages.length ? null : <img className="review__carousel--arrow" src="../src/assets/arrowRight.png" alt="Next" />}
        onSelect={(selectedIndex) => {
          setPageNumber(storyPages[selectedIndex]?.pageNumber || 1);
        }}
      >
        {storyPages.map((page) => (
          <Carousel.Item key={page.id}>
            <img className="review__storyImage" src={`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${page.image}`} alt="Story Image" />
            <p className="review__storyText">{page.textContent}</p>
          </Carousel.Item>
        ))}
      </Carousel>
      <span className="review__storyText--pageNumber">Page {pageNumber}</span>
      <br />

      <div className="review_button-pane">
        {source === 'create' && <button onClick={handleDeleteClick}>Delete</button>}

        {source === 'create' && <button onClick={handleSaveClick}>Confirm</button>}

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
