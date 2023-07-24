import { useEffect, useState } from 'react';
import { loadingText } from './loadingTextData';
import { LoadingIcon } from './LoadingIcon';

const Loading = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingIndex((prevIndex) => Math.floor(Math.random() * loadingText.length));
    }, 4000);
    return () => {
      clearInterval(loadingInterval);
    };
  }, [loadingText.length]);

  return (
    <section className="loading__container">
      <LoadingIcon />
      <div className="loading__text">{loadingText[loadingIndex]}</div>
    </section>
  );
};

export default Loading;
