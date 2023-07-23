import { useEffect, useState } from 'react';
import { loadingText } from './loadingTextData';

const Loading = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingIndex((prevIndex) => Math.floor(Math.random() * loadingText.length));
    }, 2000);
    return () => {
      clearInterval(loadingInterval);
    };
  }, [loadingText.length]);

  return (
    <section className="loading__container">
      <img className="loading__icon" src="src/assets/Spinner.gif" alt="Loading" />
      <div className="loading__text">{loadingText[loadingIndex]}</div>
    </section>
  );
};

export default Loading;
