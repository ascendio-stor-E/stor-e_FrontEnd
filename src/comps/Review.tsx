import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';

const Review = () => {
  return (
    <section>
      <Carousel interval={null}>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate aliquid incidunt vero rem earum facilis doloribus nisi voluptatum repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate aliquid incidunt vero rem earum facilis doloribus nisi voluptatum repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate aliquid incidunt vero rem earum facilis doloribus nisi voluptatum repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate aliquid incidunt vero rem earum facilis doloribus nisi voluptatum repudiandae.</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__logo" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
          <p className="review__storyText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate aliquid incidunt vero rem earum facilis doloribus nisi voluptatum repudiandae.</p>
        </Carousel.Item>
      </Carousel>
      <button>Delete</button>
      <button>Save</button>
    </section>
  );
};

export default Review;
