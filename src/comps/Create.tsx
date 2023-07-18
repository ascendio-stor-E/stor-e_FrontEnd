const Gallery = () => {
  return (
    <>
      <section className="create">
        <img className="create__image" src="./src/assets/Ascendio Logo.png" alt="Dummy Ascendio Logo" />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, consequatur aut voluptates eaque sequi.</p>
        <form>
          <label>
            What is the name of our hero or heroine? <br />
            <input className="create__name-input" type="text" name="name"/>
          </label>
          <br />
          <ul className="create__options-list">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </form>
        <button className="create__button">Random</button>
        <button className="create__button">Create</button>
      </section>
    </>
  );
};

export default Gallery;
