import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './comps/Navbar.tsx';
import Home from './comps/Home.tsx';
import About from './comps/About.tsx';
import Create from './comps/Create.tsx';
import { useState } from 'react';
import { StoryStartResponse } from './StoryStartResponse.tsx';
import Gallery from './comps/galleryComps/Gallery.tsx';

function App() {
  const [initialStoryOptions, setInitialStoryOptions] = useState<StoryStartResponse>()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setInitialStoryOptions={setInitialStoryOptions}/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/create" element={<Create initialStoryOptions={initialStoryOptions}/>}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </>
  );
}

export default App;