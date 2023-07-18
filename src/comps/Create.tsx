const Gallery = () => {
  return (
    <>
      <section className="create">
        <img className="create__image" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
        <p className="create__intro-text">Welcome to Stor-E, your very own unique adventure generator. Choose the option that you want to explore and we can begin!</p>
        <form>
          <label>
            What is the name of our hero or heroine? <br />
            <input className="create__name-input" type="text" name="name"/>
          </label>
          <br />
          <ul className="create__options-list">
            <li>
              <input type="radio" name="option" value="Option 1" id="option1" />
              <label htmlFor="option1"> Option 1</label>
            </li>
            <li>
              <input type="radio" name="option" value="Option 2" id="option2" />
              <label htmlFor="option2">Option 2</label>
            </li>
            <li>
              <input type="radio" name="option" value="Option 3" id="option3" />
              <label htmlFor="option3"> Option 3</label>
            </li>
          </ul>
        </form>
        <button className="create__button">Random</button>
        <button className="create__button">Create</button>
      </section>
    </>
  );
};

export default Gallery;
