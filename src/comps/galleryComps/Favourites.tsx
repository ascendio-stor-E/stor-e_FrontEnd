import { Container, Row, Col } from 'react-bootstrap';
import { StoryBookInfoType } from './Gallery';
import StoryBookCard from './StoryBookCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type StoryBookProps = {
  favouriteStoryBooks: StoryBookInfoType[];
  onStoryBookRemove: (storyBookId: string) => void;
  onStoryBookFavorited: (storyBookId: string, status: string) => void;
};

const Favourites = (props: StoryBookProps) => {

  return (
    <section className="favourites">
      <h3>Favourite Story Books</h3>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4}>
          {props.favouriteStoryBooks && props.favouriteStoryBooks.map((favouriteStoryBook) => (
              
            <Col key={favouriteStoryBook.id}>
              <StoryBookCard storyBook={favouriteStoryBook} onStoryBookRemove={props.onStoryBookRemove} onStoryBookFavorited={props.onStoryBookFavorited} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Favourites;
