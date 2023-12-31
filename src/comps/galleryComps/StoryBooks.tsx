import { Container, Row, Col } from 'react-bootstrap';
import { StoryBookInfoType } from './Gallery';
import StoryBookCard from './StoryBookCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type StoryBookProps = {
    storyBooks: StoryBookInfoType[];
    onStoryBookRemove: (storyBookId: string) => void;
    onStoryBookFavorited: (storyBookId: string, status: string) => void;
};

const StoryBooks = (props: StoryBookProps) => {

    return (
      <section className="story-books">
        <Container>
          <Row xs={1} sm={2} md={3} lg={4}>
            {props.storyBooks && props.storyBooks.map((storyBook) => (
                
              <Col key={storyBook.id}>
                <StoryBookCard storyBook={storyBook} onStoryBookRemove={props.onStoryBookRemove} onStoryBookFavorited={props.onStoryBookFavorited} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  };
  
  export default StoryBooks;