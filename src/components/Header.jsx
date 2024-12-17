import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar expand="lg" className=" py-3 " style={{backgroundColor:"#dcdcdc"}}>
      <Container>
        <Navbar.Brand href="#home" style={{fontSize:"25px",fontWeight:"bold"}}>
          <i className="fa-solid fa-sign-hanging fa-xl" style={{color: "#a3bff0",}} />
          {" "}
          RealSpace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='text-dark'><Link to={'/'} style={{textDecoration:"none",color:"black"}}>Home</Link></Nav.Link>
            <Nav.Link href="#services" className='text-dark'>Services</Nav.Link>
            <Nav.Link href="#about" className='text-dark'>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header