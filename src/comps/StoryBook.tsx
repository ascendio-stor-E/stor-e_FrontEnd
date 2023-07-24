import Carousel from 'react-bootstrap/Carousel';
import { StoryViewer } from '../types/StoryViewer';
import { useState } from 'react';

const StoryBook = (props: StoryViewer) => {
  const [pageNumber, setPageNumber] = useState<number>(props.pageNumber);

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <section>
      <h3 className="review__story-title">
        <strong>{props.storyTitle}</strong>
      </h3>
      <Carousel
        interval={null}
        indicators={false}
        wrap={false}
        prevIcon={pageNumber === 1 ? null : <img className="review__carousel--arrow" src="../src/assets/arrowLeft.png" alt="Prev" onClick={handlePrevClick} />}
        nextIcon={pageNumber === 5 ? null : <img className="review__carousel--arrow" src="../src/assets/arrowRight.png" alt="Next" onClick={handleNextClick} />}
      >
        {props.storyPages.map((page) => (
          <Carousel.Item key={page.id}>
            <img className="review__storyImage" src={`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${page.image}`} alt="Story Image" />
            <p className="review__storyText">{page.textContent}</p>
            <span className="review__storyText--pageNumber">Page {pageNumber}</span>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default StoryBook;
