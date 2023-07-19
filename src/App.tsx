import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './comps/Navbar.tsx';
import Home from './comps/Home.tsx';
import About from './comps/About.tsx';
import Favourites from './comps/Favourites';
import Create from './comps/Create.tsx';
import { useState } from 'react';
import { StoryStartResponse } from './StoryStartResponse.tsx';

function App() {
  const [initialStoryOptions, setInitialStoryOptions] = useState<StoryStartResponse>()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setInitialStoryOptions={setInitialStoryOptions}/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/create" element={<Create initialStoryOptions={initialStoryOptions}/>}/>
      </Routes>
    </>
  );
}

export default App;