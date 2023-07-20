import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { StoryBook } from '../types/StoryBook';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type StoryBookProps = {
  currentStoryBook: StoryBook | undefined;
};

const Review = (props: StoryBookProps) => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/${storyBookId}`)
        .then((response) => {
          console.log('Got response', response.data);
        })
        .catch((err) => console.error('Cannot review story', err));
    };
    getData();
  }, [storyBookId]);

  const handleDeleteClick = () => {
    axios.delete(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${storyBookId}`).catch((err) => console.error('Cannot delete story', err));

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
