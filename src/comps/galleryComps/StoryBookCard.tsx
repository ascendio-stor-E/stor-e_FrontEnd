import { StoryBookInfoType } from './Gallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type StoryBookCardProps = {
  storyBook: StoryBookInfoType;
};

const StoryBookCard = (props: StoryBookCardProps) => {
   console.log(props);
  return (
    <div className="col">
      <div className="gallery-item card">
        <img src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${props.storyBook.coverImage}`} className="card-img-top" alt=".aa.."/>
  
        <div className="card-body">
          <h5 className="card-title">{props.storyBook.title || 'Untitled'}</h5>
        
          <div className="card-body card-body-buttons">
            <button>Print</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryBookCard;
