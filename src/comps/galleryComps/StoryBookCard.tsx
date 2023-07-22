import { useState } from 'react';
import { StoryBookInfoType } from './Gallery';
import './gallery.css'
import eyeImg from '../../assets/view-eye-white.png'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type StoryBookCardProps = {
  storyBook: StoryBookInfoType;
  onStoryBookRemove: (storyBookId: string) => void;
};

const StoryBookCard = (props: StoryBookCardProps) => {
   console.log(props);

  const [mouseOver, setMouseOver] = useState(false); 
  const [isFavClicked, setIsFavClicked] = useState(false); 

  const onMouseEnter = () => {
    setMouseOver(true);
  }

  const onMouseLeave = () => {
    setMouseOver(false);
  }

  const handleDeleteStoryBook = (id: string) => {
    axios.delete(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook/${id}`)
    .then(response => {
      console.log(response.data);
      props.onStoryBookRemove(id);
    })
    .catch(error => {
      console.error('Error deleting record:', error);
    });
  };

  const handleFavouriteClick = () => {
    setIsFavClicked(isFavClicked => !isFavClicked);
  };

  return (
    <div className="col ">
      
      <div className="gallery-item card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
        <div className="card-img-top position-relative" >

        <a href={`/review/${props.storyBook.id}`}>
        <div className='selected-card position-absolute'> 
          {mouseOver && <img src={eyeImg} className='storybookcard__img-eye'/>}
        </div>
        </a>

        <img src={`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/story/image/${props.storyBook.coverImage}`} className="card-img-top" alt=".aa.."/>
  </div>
        <div className="card-body">
          <h4 className={`card-title ${mouseOver && "card-title-mouseover"}`}>{props.storyBook.title || 'Untitled'}</h4>
        
          <div className="card-body card-body_buttons">

            <i className={`bi bi-heart${isFavClicked ? '-fill' : ''} bi-2x`} 
                title={`${isFavClicked ? 'Remove from favourites' : 'Add to favourites'}`} 
                onClick={handleFavouriteClick}></i>

            <div className='card-body_button-pane'>
              <button className='btn btn-info'>Print</button>
              <button className='btn btn-danger' onClick={() => handleDeleteStoryBook(props.storyBook.id)}>
                Delete
              </button>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  
  );
};

export default StoryBookCard;
