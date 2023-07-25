import Favourites from './Favourites';
import StoryBooks from './StoryBooks';
import Drafts from './Drafts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { errorAlert } from '../../common/helpers/errorHandler';
import { errorMessages } from '../../common/constants/constants';
import { StoryBook } from '../../types/StoryBook';
import { stopNarration } from '../../common/helpers/VoiceNarrator';
import bugPng from '../../assets/bug.png';
import './gallery.css'


export type StoryBookInfoType = {
  id: string;
  title: string;
  coverImage: string;
  numberOfPages: number;
  status: string;  
}

type GalleryProps = {
  setCurrentStoryBook: (book: StoryBook) => void;
}

const Gallery = (props: GalleryProps) => {

  const [favouriteStoryBooksList, setFavouriteStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [storyBooksList, setStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [draftStoryBooksList, setDraftStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [count, setCount] = useState(0);
  const [showBooks, setShowBooks] = useState<Number>(2);

  let userId = "bc644717-5970-4e0b-88a7-35d5f0931be1";

  stopNarration();
 
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/storybook?userId=${userId}`)
      .then(response => response.data)
      .then(data => {
        const favouriteStoryBooksList = (data.filter((storyBook: any) => storyBook.status === 'FAVOURITE'));
        const storyBooksList = (data.filter((storyBook: any) => storyBook.status === 'COMPLETE' || storyBook.status === 'FAVOURITE'));
        const draftStoryBooksList = (data.filter((storyBook: any) => storyBook.status === 'DRAFT'));
        setFavouriteStoryBooksList(favouriteStoryBooksList)
        setStoryBooksList(storyBooksList)
        setDraftStoryBooksList(draftStoryBooksList)
      })
      .catch(err => errorAlert(errorMessages.serverError, 'Cannot get story books of user ' + userId, err));
      if(false) {
        setCount(1);
      }
  }, [count]);

  const onTabClicked = (tabClicked: Number) => {
    setShowBooks(tabClicked);
  }

  const onStoryRemoved = (storyBookId: string) => {
    setStoryBooksList(prevList => prevList.filter(book => book.id !== storyBookId)); 
    setFavouriteStoryBooksList(prevList => prevList.filter(book => book.id !== storyBookId));  
    setDraftStoryBooksList(prevList => prevList.filter(book => book.id !== storyBookId));      
  }

  const onStoryFavourited = (storyBookId: string, status: string) => {
    setStoryBooksList(prevList => prevList.map(book => {
      if (book.id === storyBookId) {
        book.status = status;
      }
      return book;
    }));
    setFavouriteStoryBooksList(storyBooksList.filter(storyBook => storyBook.status === 'FAVOURITE'));
  }

  return (
    <section className="gallery">
      <img src={bugPng} className='bug' />
    <ul className="nav nav-pills nav-fill ul">

    <li className="nav-item">
        <a className={`nav-link ${showBooks == 2 && "active"}`} onClick={() => onTabClicked(2)}>
          Favourites         
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${showBooks == 1 && "active"}`} onClick={() => onTabClicked(1)}>
          Story Books          
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${showBooks == 0 && "active"}`} onClick={() => onTabClicked(0)}>
          Drafts
        </a>
      </li>

    </ul>
    
      {showBooks == 2 && favouriteStoryBooksList && <Favourites favouriteStoryBooks={favouriteStoryBooksList}  onStoryBookRemove={onStoryRemoved} onStoryBookFavorited={onStoryFavourited}/> }
      {showBooks == 1 && storyBooksList && <StoryBooks storyBooks={storyBooksList}  onStoryBookRemove={onStoryRemoved} onStoryBookFavorited={onStoryFavourited} /> }
      {showBooks == 0 && draftStoryBooksList && <Drafts draftStoryBooks={draftStoryBooksList} onStoryBookRemove={onStoryRemoved} setCurrentStoryBook={props.setCurrentStoryBook} />}


    </section>
  );
};

export default Gallery;
