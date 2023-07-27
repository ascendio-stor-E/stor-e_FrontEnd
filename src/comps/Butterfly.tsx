import ButterflyImg from '../assets/Butterfly.png';

const Butterfly = () => {
  return (
    <>
    <section className='butterfly__container'></section>
      <img className="butterfly butterfly1" src={ButterflyImg} alt="Butterfly" />
      <img className="butterfly butterfly2" src={ButterflyImg} alt="Butterfly" />
      <img className="butterfly butterfly3" src={ButterflyImg} alt="Butterfly" />
      <img className="butterfly butterfly4" src={ButterflyImg} alt="Butterfly" />
    </>
  );
};

export default Butterfly;
