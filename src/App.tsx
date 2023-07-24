import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./comps/Navbar.tsx";
import Home from "./comps/Home.tsx";
import About from "./comps/About.tsx";
import Create from "./comps/Create.tsx";
import { useState } from "react";
import Gallery from "./comps/galleryComps/Gallery.tsx";
import StoryPage from "./comps/StoryPage.tsx";
import { StoryBook } from "./types/StoryBook.tsx";
import Review from "./comps/Review.tsx";

function App() {
  const [currentStoryBook, setCurrentStoryBook] = useState<StoryBook>();
  const [characterName, setCharacterName] = useState<string>("");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setCurrentStoryBook={setCurrentStoryBook} setCharacterName={setCharacterName} characterName ={characterName} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/create" element={<Create currentStoryBook={currentStoryBook} />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route
          path="/storypage/:pageNumber"
          element={<StoryPage currentStoryBook={currentStoryBook} />}
        ></Route>
        <Route path="/review/:storyBookId" element={<Review />}></Route>
      </Routes>
    </>
  );
}

export default App;
