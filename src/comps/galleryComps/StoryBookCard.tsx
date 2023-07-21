import { StoryBookInfoType } from './Gallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './gallery.css'
import eyeImg from '../../assets/view-eye-white.png'
import { useState } from 'react';

type StoryBookCardProps = {
  storyBook: StoryBookInfoType;
};

const StoryBookCard = (props: StoryBookCardProps) => {
   console.log(props);

  const [mouseOver, setMouseOver] = useState(false); 

  const onMouseEnter = () => {
    setMouseOver(true);
  }

  const onMouseLeave = () => {
    setMouseOver(false);
  }

  return (
    <div className="col ">
      
      <div className="gallery-item card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
        <div className="card-img-top position-relative" >

        <a href={`/review/${props.storyBook.id}`}>
        <div className=' selected-card position-absolute'> 
          {mouseOver && <img src={eyeImg} className='img-eye'/>}
        </div>
        </a>

        <img src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${props.storyBook.coverImage}`} className="card-img-top" alt=".aa.."/>
  </div>
        <div className="card-body">
          <h4 className={`card-title ${mouseOver && "card-title-mouseover"}`}>{props.storyBook.title || 'Untitled'}</h4>
        
          <div className="card-body card-body-buttons">
            <button className='btn btn-info'>Print</button>
            <button className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      
    </div>
  
  );
};

export default StoryBookCard;
