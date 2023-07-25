import axios from "axios";
import Loading from "./Loading";
import { StoryStartResponse } from "../types/StoryStartResponse";
import { useNavigate } from "react-router-dom";
import { StoryBook } from "../types/StoryBook";
import { useState } from "react";
import { errorAlert } from "../common/helpers/errorHandler";
import { errorMessages } from "../common/constants/constants";
import { Modal, Button } from "react-bootstrap";
import logo from "./../assets/Store-E Logo V2.png";

type HomeProps = {
  setCurrentStoryBook: (book: StoryBook) => void;
  setCharacterName: (characterName: string) => void;
  characterName: string;
};

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getStarted = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!props.characterName) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    axios
      .post<StoryStartResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/story?characterName=${props.characterName}`
      )
      .then((response) => {
        setIsLoading(false);

        const storyBook: StoryBook = {
          storyBookId: response.data.storyBookId,
          conversationId: response.data.conversationId,
          coverImage: "",
          options: response.data.options,
          pages: [],
        };

        props.setCurrentStoryBook(storyBook);

        navigate("/create");
      })
      .catch((err) => {
        errorAlert(errorMessages.serverError, "Cannot create initial story", err);
        setIsLoading(false);
      });
  };

  const setCharacter = (event) => {
    props.setCharacterName(event.target.value);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="home">
        <img className="home__logo" src={logo} alt="Stor-E Logo" />
        <br />
        <form>
          <label>
            Pick a name for your story's main character.
            <br />
            What about your own name, or maybe your best friend's?
            <br />
            <input
              className="create__name-input"
              type="text"
              name="name"
              onChange={setCharacter}
            />
          </label>
          <br />
          <button className="home__create-button" onClick={getStarted}>
            Get Started
          </button>
        </form>
      </section>
      {isLoading && <Loading />}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Missing Character Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          For beginning the adventure, I need your character's name.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
