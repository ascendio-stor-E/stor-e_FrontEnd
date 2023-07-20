import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './comps/Navbar.tsx';
import Home from './comps/Home.tsx';
import About from './comps/About.tsx';
import Create from './comps/Create.tsx';
import Gallery from './comps/galleryComps/Gallery.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </>
  );
}

export default App;