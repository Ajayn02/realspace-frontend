import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './Profile';

function Homenav() {
    return (
        <>
            <Navbar expand="lg" className="" style={{backgroundColor:"white"}}>
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <div className='d-flex my-3' style={{maxWidth:"300px"}}>
                                <input type="text" className='form-control' placeholder='Enter Location' />
                                <button className='btn btn-success ms-3 d-flex justify-content-center align-items-center  '>
                                    <i className="fa-solid fa-magnifying-glass me-2" style={{color: "#FFFFFF",}} />
                                    Search
                                </button>
                            </div>

                        </Nav>
                        <Nav className='ms-auto'>
                            <div className='my-3'>
                                <Profile />
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Homenav