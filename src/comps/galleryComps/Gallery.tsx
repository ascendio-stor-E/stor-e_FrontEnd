import Favourites from './Favourites';
import StoryBooks from './StoryBooks';
import Drafts from './Drafts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { errorAlert } from '../../common/helpers/errorHandler';
import { errorMessages } from '../../common/constants/constants';

export type StoryBookInfoType = {
  id: string;
  title: string;
  coverImage: string;
  status: boolean;
}

const Gallery = () => {

  const [favouriteStoryBooksList, setFavouriteStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [storyBooksList, setStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [draftStoryBooksList, setDraftStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [count, setCount] = useState(0);
  const [showBooks, setShowBooks] = useState<Number>(2);

  let userId = "bc644717-5970-4e0b-88a7-35d5f0931be1";
 
  useEffect(() => {
    axios.get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook?userId=${userId}`)
      .then(response => response.data)
      .then(data => {
        const favouriteStoryBooksList = (data.filter((storyBook: any) => storyBook.status === 'FAVOURITE'));
        const storyBooksList = (data.filter((storyBook: any) => storyBook.status === 'COMPLETE'));
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

  const onRemoveStory = (storyBookId: string) => {
    setStoryBooksList(prevList => prevList.filter(book => book.id !== storyBookId));      
  }

  return (
    <section className="gallery">

    <ul className="nav nav-tabs">

    <li className="nav-item">
        <a className={`nav-link ${showBooks == 2 && "active"}`} onClick={() => onTabClicked(2)}>
          My Favourite Story Books         
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${showBooks == 1 && "active"}`} onClick={() => onTabClicked(1)}>
          All Story Books          
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${showBooks == 0 && "active"}`} onClick={() => onTabClicked(0)}>
          Drafts
        </a>
      </li>

    </ul>
    
      {showBooks == 2 && favouriteStoryBooksList && <Favourites favouriteStoryBooks={favouriteStoryBooksList}  onStoryBookRemove={onRemoveStory} /> }
      {showBooks == 1 && storyBooksList && <StoryBooks storyBooks={storyBooksList}  onStoryBookRemove={onRemoveStory} /> }
      {showBooks == 0 && draftStoryBooksList && <Drafts draftStoryBooks={draftStoryBooksList} onStoryBookRemove={onRemoveStory}/>}


    </section>
  );
};

export default Gallery;
