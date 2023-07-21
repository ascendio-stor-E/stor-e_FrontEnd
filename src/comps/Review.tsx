import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoryPageData } from '../types/StoryPageData';

type StoryPageData = {
  id: string;
  textContent: string;
  pageNumber: number;
  image: string;
};

const Review = (props: StoryBookProps) => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const navigate = useNavigate();
  const [storyPages, setStoryPages] = useState<StoryPageData[]>([]);
  console.log(storyBookId);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/all/${storyBookId}`)
        .then((response) => {
          console.log('Got response', response.data);
          setStoryPages(response.data);
        })
        .catch((err) => console.error('Cannot review story', err));
    };
    getData();
  }, [storyBookId]);

  const handleDeleteClick = () => {
    axios
    .delete(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${storyBookId}`)
    .catch((err) => console.error('Cannot delete story', err));
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
            <img className="home__logo" src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${page.image}`} alt="Dummy Ascendio Logo" />
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
