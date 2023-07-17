import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './comps/Navbar.tsx';
import Home from './comps/Home.tsx';
import About from './comps/About.tsx';
import Favourites from './comps/Favourites';
import Gallery from './comps/Gallery.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/create" element={<Gallery />}/>
      </Routes>
    </>
  );
}

export default App;