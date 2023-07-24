import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoryPageData } from '../types/StoryPageData';
import { errorAlert } from '../common/helpers/errorHandler';
import { errorMessages } from '../common/constants/constants';
import StoryViewer from './storyViewerComps/StoryViewer';

const Review = () => {
  const { storyBookId } = useParams<{ storyBookId: string }>();
  const [storyPages, setStoryPages] = useState<StoryPageData[]>([]);
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}/stories`)
        .then((response) => {
          const sortedPages = response.data.sort((a: { pageNumber: number }, b: { pageNumber: number }) => a.pageNumber - b.pageNumber);

          setStoryPages(sortedPages);
          setPageNumber(sortedPages[0]?.pageNumber || 1);
        })
        .catch((err) => errorAlert(errorMessages.serverError, 'Cannot get stories for ' + storyBookId, err));
    };
    getData();

    const getTitle = () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}`)
        .then((response) => {
          setStoryTitle(response.data.title);
        })
        .catch((err) => console.error('Cannot review story', err));
    };
    getTitle();
  }, [storyBookId]);

  const handleDeleteClick = () => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/storybook/${storyBookId}`).catch((err) => errorAlert(errorMessages.cannotDelete, 'Cannot delete story book ' + storyBookId, err));
    navigate(`/gallery`);
  };

  const handleSaveClick = () => {
    navigate('/gallery');
  };

  return (
    <section>
      <StoryViewer storyTitle={storyTitle} storyPages={storyPages} pageNumber={pageNumber} />
      <br />
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleSaveClick}>Confirm</button>
    </section>
  );
};

export default Review;
