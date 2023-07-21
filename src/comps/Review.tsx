import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { StoryPageType } from '../types/StoryPageType';

type StoryBookProps = {
  currentStoryBook: StoryPageType | undefined;
};

const Review = (props: StoryBookProps) => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const navigate = useNavigate();
  console.log(storyBookId);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`http://localhost:8080/api/story/all/${storyBookId}`)
        .then((response) => {
          console.log('Got response', response.data);
          // const storyData: StoryPageType = {
          //   part: response.data.pageNumber;
          //   story: response.data.textContext;
          //   image: response.data.image;
          // }
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
        <Carousel.Item>
          <img className="home__logo" src="../src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias ex adipisci esse sapiente ad commodi quis doloribus officiis repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="../src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias ex adipisci esse sapiente ad commodi quis doloribus officiis repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="../src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias ex adipisci esse sapiente ad commodi quis doloribus officiis repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="../src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias ex adipisci esse sapiente ad commodi quis doloribus officiis repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="../src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias ex adipisci esse sapiente ad commodi quis doloribus officiis repudiandae.</p>
        </Carousel.Item>
      </Carousel>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleSaveClick}>Save</button>
    </section>
  );
};

export default Review;
