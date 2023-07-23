import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoryPageData } from '../types/StoryPageData';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';

const Review = () => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const navigate = useNavigate();
  const [storyPages, setStoryPages] = useState<StoryPageData[]>([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${storyBookId}/stories`)
        .then((response) => {
          const sortedPages = response.data.sort((a: { pageNumber: number; }, b: { pageNumber: number; }) => a.pageNumber - b.pageNumber);
          setStoryPages(sortedPages);
        })
        .catch((err) => errorAlert(errorMessages.serverError, 'Cannot get stories for ' + storyBookId, err));
    };
    getData();
  }, [storyBookId]);

  const handleDeleteClick = () => {
    axios
    .delete(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${storyBookId}`)
    .catch((err) => errorAlert(errorMessages.cannotDelete, 'Cannot delete story book ' + storyBookId, err));
    navigate(`/`);
  };

  const handleSaveClick = () => {
    navigate('/gallery');
  };

  return (
    <section>
      <Carousel interval={null}>
        {storyPages.map((page) => (
          <Carousel.Item key={page.id}>
            <img className="home__logo" src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${page.image}`} alt="Story Image" />
            <p className="review__storyText">{page.textContent}</p>
          </Carousel.Item>
        ))}
      </Carousel>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleSaveClick}>Confirm</button>
    </section>
  );
};

export default Review;
