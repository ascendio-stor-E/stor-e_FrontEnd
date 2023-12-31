import { useState } from 'react';
import { StoryBookInfoType } from './Gallery';
import './gallery.css'
import eyeImg from '../../assets/view-eye-white.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Tooltip from "react-bootstrap/Tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { OverlayTrigger } from 'react-bootstrap';
import { errorAlert } from '../../common/helpers/errorHandler';
import { errorMessages } from '../../common/constants/constants';
import { StoryBook } from '../../types/StoryBook';
import DeleteItemModal from '../modals/DeleteItemModal';

type StoryBookCardProps = {
  storyBook: StoryBookInfoType;
  onStoryBookRemove: (storyBookId: string) => void;
  onStoryBookFavorited?: (storyBookId: string, status: string) => void;
  setCurrentStoryBook?: (book: StoryBook) => void;
};

const StoryBookCard = (props: StoryBookCardProps) => {
  const [mouseOver, setMouseOver] = useState(false); 
  const [isFavClicked, setIsFavClicked] = useState(props.storyBook.status === 'FAVOURITE'); 
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const navigate = useNavigate();

  const onMouseEnter = () => {
    setMouseOver(true);
  }

  const onMouseLeave = () => {
    setMouseOver(false);
  }

  const handleDeleteStoryBook = (id: string) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${id}`)
    .then(_ => {
      props.onStoryBookRemove(id);
    })
    .catch(err => errorAlert(errorMessages.cannotDelete, 'Cannot delete story book' + id, err));
  };

  const handleFavouriteClick = (id: string, status: string) => {
    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${id}/favourite`)
    .then(response => {
      console.log(response.data);
      if (props.onStoryBookFavorited) {
        props.onStoryBookFavorited(id, status)
      }
    })
    .catch(error => {
      console.error('Error updating record:', error);
    });
    setIsFavClicked(isFavClicked => !isFavClicked);
  };

  const downloadStoryBook = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${props.storyBook.id}/download`, "_blank", "noreferrer");
  }

  const editDraftStoryBook = (lastPageCreated: number) => {
    axios
      .get<StoryBook>(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${props.storyBook.id}/continueDraft`)
      .then((response) => {
          if(props.setCurrentStoryBook) {
            props.setCurrentStoryBook(response.data);
            navigate(`/storypage/${lastPageCreated}`);
          }
          
      })
      .catch(err => errorAlert(errorMessages.serverError, `Cannot load draft ${props.storyBook.id}` , err));
    
  }

  const handleModalClose = () => {
    setDeleteShowModal(false);
  };

  const addFavouriteTooltip = (props:any) => (
    <Tooltip {...props}>Add to favourite</Tooltip>
  );

  const removeFromFavouriteTooltip = (props:any) => (
    <Tooltip {...props}>Remove from favourite</Tooltip>
  );

  const downloadStorybookTooltip = (props:any) => (
    <Tooltip {...props}>Download storybook</Tooltip>
  );

  const editDraftTooltip = (props:any) => (
    <Tooltip {...props}>Edit draft</Tooltip>
  );

  const deleteStorybookTooltip = (props:any) => (
    <Tooltip {...props}>Delete storybook</Tooltip>
  );

  return (
    <div className="col ">
      
      <div className="gallery-item card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
        <div className="card-img-top position-relative" >

        {( props.storyBook.status !== 'DRAFT' && <a href={`/review/${props.storyBook.id}?source=gallery`}>
        <div className='selected-card position-absolute'> 
          {mouseOver && <img src={eyeImg} className='storybookcard__img-eye'/>}
        </div>
        </a>)}

        <img src={`${import.meta.env.VITE_BACKEND_URL}/api/story/image/${props.storyBook.coverImage}`} className="card-img-top" alt=".aa.."/>
  </div>
        <div className="card-body">
          <h4 className={`card-title ${mouseOver && "card-title-mouseover"}`}>{props.storyBook.title || 'Untitled'}</h4>
        
          {props.storyBook.status == 'DRAFT' && 
           <ProgressBar variant='info' striped now={(props.storyBook.numberOfPages/5)*100} label= {<span className='progress-label'>{`${props.storyBook.numberOfPages} of 5`}</span> } />
          }

          <div className="card-body card-body_buttons">

            <div className='card-body_button-pane'>

            {props.onStoryBookFavorited && 
            <OverlayTrigger placement='bottom' overlay= {props.storyBook?.status === 'FAVOURITE' ? removeFromFavouriteTooltip : addFavouriteTooltip } 
            >
            <button className='card-btn card-btn-fav'>
            <i className={`bi bi-heart${(isFavClicked && props.storyBook.status === 'FAVOURITE') ? '-fill' : ''} bi-5x`} 
                title={`${isFavClicked ? 'Remove from favourites' : 'Add to favourites'}`} 
                onClick={() => handleFavouriteClick(props.storyBook.id, props.storyBook.status === 'FAVOURITE' ? 'COMPLETE' : 'FAVOURITE')}></i>
            </button>
            </OverlayTrigger>
            }
            
              {props.storyBook.status === 'DRAFT' && 
              <OverlayTrigger placement='bottom' overlay={editDraftTooltip}>
              <button className="card-btn card-btn-edit" onClick={() => editDraftStoryBook(props.storyBook.numberOfPages)}>
                <i className='bi-pencil-square'></i>
                </button>
                </OverlayTrigger>
                }

              {props.storyBook.status != 'DRAFT' && 
              <OverlayTrigger placement='bottom' overlay={downloadStorybookTooltip}>
              <button className="card-btn card-btn-download" onClick={downloadStoryBook}>
                <i className='bi-cloud-download-fill'></i>
                </button>
                </OverlayTrigger>
                }

              <OverlayTrigger placement='bottom' overlay={deleteStorybookTooltip}>
              <button className="card-btn card-btn-delete" onClick={() => setDeleteShowModal(true)}>
                <i className='bi-trash-fill'></i>
              </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div> 
      <DeleteItemModal show={deleteShowModal} onClose={handleModalClose} onDelete={() => handleDeleteStoryBook(props.storyBook.id)} />
    </div>
  );
};

export default StoryBookCard;
