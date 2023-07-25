import { useEffect, useState } from 'react';
import { loadingText } from '../data/loadingTextData';
import icon from './../assets/PagesTurning.gif'

const Loading = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingIndex((prevIndex) => Math.floor(Math.random() * loadingText.length));
    }, 3500);
    return () => {
      clearInterval(loadingInterval);
    };
  }, [loadingText.length]);

  return (
    <section className="loading__container">
      <img className="loading__icon" src={icon} alt="Loading" />
      <div className="loading__text">{loadingText[loadingIndex]}</div>
    </section>
  );
};

export default Loading;
