import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'

function Landing() {
  return (
    <>
      <Header/>

      <div className='container ' style={{ minHeight: "70vh", marginTop: "50px",marginBottom:"80px" }}>
        <Row >
          <Col md={6} sm={12} className=' d-flex justify-content-center align-items-center'>
            <div className='container ' >
              <h2 >Find Your Dream Home,<br />Live Your Dream Life </h2>
              <p style={{ textAlign: "justify" }}>Welcome to RealSpace, your one-stop destination for buying, selling, and renting properties. Explore our wide range of listings, and discover your perfect match today.</p>
              <Link to={"/auth"} className='btn btn-secondary px-5'>Let's Start </Link>
            </div>
          </Col>
          <Col md={6} sm={12} className=' container d-flex justify-content-center align-items-center'>
            <img src="https://img.freepik.com/premium-vector/house-with-laptop-smartphone-shopping-bag-front-it_657438-37652.jpg?w=740" width={'78%'} alt="" />
          </Col>
        </Row>
      </div>

      {/* section-2 */}
      <div className='container  ' style={{ marginTop: "50px",minHeight:"100vh" }} id='services'>
        <h2 className='text-center'>Service's</h2>
        <Row className='d-flex  align-items-center' style={{justifyContent:"space-evenly"}}>

          

          <Col className='d-flex justify-content-center align-items-center mt-5' md={6} lg={4} sm={12} >
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://img.freepik.com/free-vector/selfie-concept-illustration_114360-560.jpg?t=st=1732634863~exp=1732638463~hmac=9f3ef74b1fa6c1c1223ae40099f782b7c07da4691cb82738721d6b36d4620dd9&w=826" />
              <Card.Body>
                <Card.Title className='text-center'>Post Your Property with Ease</Card.Title>
                <Card.Text style={{textAlign:"justify"}}>
                 Our post features allow you to showcase your property to a wide audience of potential buyers.Our post features are designed to be user-friendly and easy to navigate. We guide you through the posting process step-by-step, ensuring that your property listing is accurate and effective
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className='d-flex justify-content-center align-items-center mt-5' md={6} lg={4} sm={12}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://img.freepik.com/free-vector/man-woman-chatting-online-people-using-mobile-phones-speech-bubble-distance-flat-vector-illustration-communication-internet_74855-8440.jpg?t=st=1732634777~exp=1732638377~hmac=045b52f86cad51a63a9d410cd08da30c54cb889bf5bbd0e56e8be25245d84628&w=900" />
              <Card.Body>
                <Card.Title className='text-center'>Stay Connected with Our Chat Features</Card.Title>
                <Card.Text style={{textAlign:"justify"}} className='pb-3'>
                we understand the importance of clear and timely communication when buying or selling a property. That's why we've introduced our chat features, designed to keep you connected with other parties involved in your property transaction.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className='d-flex justify-content-center align-items-center mt-5'md={6} lg={4} sm={12}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148889491.jpg?t=st=1732635797~exp=1732639397~hmac=37b4157e3ec3d00a09880552449953b23cffbb1fb0f316b5aa7f38e2700dd5d4&w=826" />
              <Card.Body>
                <Card.Title className='text-center'>Customer Support</Card.Title>
                <Card.Text style={{textAlign:"justify"}} className='pb-4'>
                we're committed to providing exceptional client support services to ensure a seamless and stress-free experience for our valued clients. Our dedicated support team is available to assist with property inquiries and account management.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>

      {/* section-3 */}
      <div className='container ' style={{minHeight:"100vh"}} id='about'>
        <h2 className='text-center mt-3'>About Us</h2>
        <Row>
          <Col md={12} lg={2}></Col>
          <Col md={12} lg={8}>
            <p className='mt-5' style={{textAlign:"justify",fontSize:"20px"}}>At <b>RealSpace</b>, we're dedicated to making property buying and selling easy, efficient, and enjoyable. Our team of experienced real estate professionals is committed to providing exceptional service and expert guidance every step of the way. We're passionate about connecting people with their dream homes and investment properties. Our platform offers a wide range of listings, expert advice, and innovative tools to make your property journey smooth and successful.Our mission is to provide a seamless, transparent, and enjoyable experience for all our users.</p>
          </Col>
          <Col md={12} lg={2}></Col>
        </Row>
      </div>

      <Footer/>
    </>
  )
}

export default Landing
