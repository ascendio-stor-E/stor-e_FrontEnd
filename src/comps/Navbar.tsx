import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className='navbar'>
        <Link className="navbar__item col-sm" to="/"> Home </Link>
        |
        <Link className="navbar__item col-sm" to="/gallery"> My Stories </Link>
        |
        <Link className="navbar__item col-sm" to="/about"> About </Link>
      </nav>
  );
};

export default Navbar;