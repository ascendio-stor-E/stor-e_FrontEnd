import Favourites from './Favourites';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export type StoryBookInfoType = {
  id: string;
  title: string;
  coverImage: string;
  status: boolean;
}

const Gallery = () => {

  const [storyBooksList, setStoryBooksList] = useState<StoryBookInfoType[]>([]);
  const [count, setCount] = useState(0);

  let userId = "bc644717-5970-4e0b-88a7-35d5f0931be1";
 
  useEffect(() => {
    axios.get(`https://stor-e.purplesea-320b619b.westeurope.azurecontainerapps.io/api/storybook?userId=${userId}`)
      .then(response => response.data)
      .then(data => {
        const storyBooksList = (data.filter((storyBook: any) => storyBook.status == 1));
        setStoryBooksList(storyBooksList)
      });
  }, [count]);

  return (
    <section className="gallery">
    
      {storyBooksList && <Favourites storyBooks={storyBooksList}/> }

    </section>
  );
};

export default Gallery;
