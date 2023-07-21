import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Review = () => {
  const params = useParams();
  const storyBookId = params["id"];

  return (
    <div>
      Review
      <h1>{storyBookId}</h1>
    </div>
  )
}

export default Review
