import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className='navbar'>
        <Link className="navbar__item col-sm" to="/"> Home </Link>
        |
        <Link className="navbar__item col-sm" to="/about"> About </Link>
        |
        <Link className="navbar__item col-sm" to="/favourites"> Favourites </Link>
      </nav>
  );
};

export default Navbar;