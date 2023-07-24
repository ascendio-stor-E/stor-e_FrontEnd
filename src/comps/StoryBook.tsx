import Carousel from 'react-bootstrap/Carousel';
import { StoryPageData } from '../types/StoryPageData';

type StoryBookProps = {
  storyTitle: string;
  storyPages: StoryPageData[];
  pageNumber: number;
};

const StoryBook = (props: StoryBookProps) => {
  return (
    <section>
        <h3 className="review__story-title">
          <strong>{props.storyTitle}</strong>
        </h3>
      <Carousel
        interval={null}
        indicators={false}
        wrap={false}
        prevIcon={props.pageNumber === 1 ? null : <img className="review__carousel--arrow" src="../src/assets/arrowLeft.png" alt="Prev" />}
        nextIcon={props.pageNumber === props.storyPages.length ? null : <img className="review__carousel--arrow" src="../src/assets/arrowRight.png" alt="Next" />}
      >
        {props.storyPages.map((page) => (
          <Carousel.Item key={page.id}>
            <img className="review__storyImage" src={`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${page.image}`} alt="Story Image" />
            <p className="review__storyText">{page.textContent}</p>
            <span className="review__storyText--pageNumber">Page {props.pageNumber}</span>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default StoryBook;
