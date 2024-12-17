import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className=' container-fluid bg-dark py-3 px-5'>
        <Row>
          <Col sm={12} md={5}>
            <h3 className='text-light'>RealSpace 2024</h3>
            <p style={{ textAlign: "justify" }} className='text-light' >Reaalspace is a trusted online platform for real estate transactions. Our mission is to provide a secure, efficient, and user-friendly experience for buyers, sellers. we're dedicated to providing a seamless and enjoyable experience for all your real estate needs</p>
          </Col>
          <Col sm={12} md={2}>
            <h3 className='text-light'>Links</h3>
            <div className='d-flex flex-column'>
              <Link to={"/"}>Home</Link>
              <Link to={"/auth"}>Login</Link>
              <Link to={"/auth"}>Register </Link>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <h3 className='text-light'>Feedback</h3>
            <textarea name="" id="" className='form-control'></textarea>
            <button className='btn btn-warning mt-4'>Send</button>
          </Col>
        </Row>
        <p className='text-center mt-4'>All rights are reserved</p>
      </div>
    </>
  )
}

export default Footer