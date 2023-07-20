import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import { StoryBook } from '../types/StoryBook';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type StoryBookProps = {
  currentStoryBook: StoryBook | undefined;
};

const Review = (props: StoryBookProps) => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const [storyData, setStoryData] = useState<StoryBook[]>([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${storyBookId}`)
        .then(response => {
          console.log('Got response', response.data);
          setStoryData(response.data);
          console.log(storyData);
        })
        .catch((err) => console.error('Cannot review story', err));
    };
    getData();
  }, [storyBookId]);

  return (
    <section>
      <Carousel interval={null}>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">text</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">text</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">text</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">text</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">text</p>
        </Carousel.Item>
      </Carousel>
      <button>Delete</button>
      <button>Save</button>
    </section>
  );
};

export default Review;
