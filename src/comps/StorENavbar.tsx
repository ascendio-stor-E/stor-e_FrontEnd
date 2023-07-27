import storeLogo from '../assets/Logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const StorENavbar = () => {

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/">
            <img
              src={storeLogo}
              width="70"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="main-nav-item">HOME</Nav.Link>
            <Nav.Link href="/gallery" className="main-nav-item">MY STORIES</Nav.Link>
            <Nav.Link href="/about" className="main-nav-item">ABOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default StorENavbar;
