import { Container, Row, Col } from 'react-bootstrap';
import { StoryBookInfoType } from './Gallery';
import StoryBookCard from './StoryBookCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { StoryBook } from '../../types/StoryBook';

type StoryBookProps = {
    draftStoryBooks: StoryBookInfoType[];
    onStoryBookRemove: (storyBookId: string) => void;
    setCurrentStoryBook: (book: StoryBook) => void;
};

const Drafts = (props: StoryBookProps) => {
  return (
    <section className='drafts'>
        <Container>
        <Row xs={1} sm={2} md={3} lg={4}>
            {props.draftStoryBooks && props.draftStoryBooks.map((draftStoryBook) => (
                <Col key={draftStoryBook.id}>
                    <StoryBookCard storyBook={draftStoryBook} onStoryBookRemove={props.onStoryBookRemove} setCurrentStoryBook={props.setCurrentStoryBook} />
                </Col>
            ))}
        </Row>
        </Container>
    </section>
  )
}

export default Drafts
