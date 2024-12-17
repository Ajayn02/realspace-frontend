import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Homenav from '../components/Homenav';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/allapis';
import base_url from '../services/base_url';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Profile from '../components/Profile';


function Home() {
  const [data, setData] = useState({})
  const [search,setSearch]=useState('')

  useEffect(() => {
    displayAllPosts()
  }, [search])

  const displayAllPosts = async () => {
    const header = {
      'Content-Type': "application/json",
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getAllPosts(header, search)
    // console.log(res);
    if (res.status == 200) {
      setData(res.data)
    } else {
      console.log(res);
    }

  }

  // console.log(data);
  

  return (
    <>
  {/* navbar */}
      <Navbar expand="lg" className="" style={{ backgroundColor: "white" }}>
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <div className='d-flex my-3' style={{ maxWidth: "300px" }}>
                <input type="text" className='form-control' onChange={(e)=>{setSearch(e.target.value)}} placeholder='Enter Location' />
                {/* <button className='btn btn-success ms-3 d-flex justify-content-center align-items-center  '>
                  <i className="fa-solid fa-magnifying-glass me-2" style={{ color: "#FFFFFF", }} />
                  Search
                </button> */}
                <Link className='d-flex mt-2 ms-2 '  style={{fontSize:"17px",textDecoration:"none",color:"black",cursor:"none"}}><i className="fa-solid fa-magnifying-glass me-1 mt-1 " style={{ color: "black", }} />
                Search</Link>
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


    {/* home */}

      <div className='container-fluid px-3' style={{ minHeight: "90vh", marginBottom: "80px" }}>
        <h2 className='my-5 ms-2'>Best Properties For Sale</h2>
        {
          data?.length > 0 ?
            <Row >
              {
                data?.map(item => (
                  <Col lg={3} md={6} sm={12} className='d-flex justify-content-center align-items-center  p-0' key={item._id}>
                    <Card style={{ width: '18rem' }} className='m-3 p-0'>
                      <Card.Img variant="top" src={`${base_url}/uploads/${item.image}`} width={"100%"} height={"200px"} />
                      <Card.Body>
                        <Card.Title className=''>{item.title}</Card.Title>
                        <Card.Text style={{ textAlign: "justify" }}>
                          <i className="fa-solid fa-location-dot me-2" style={{ color: "#999993", }} />
                          <span style={{ color: "#999993" }}>{item.location}</span>
                        </Card.Text>

                        <div className='d-flex justify-content-between'>
                          <h6 className='mt-2'> ₹ {item.price}</h6>
                          <Link to={`/view/${item._id}`} className='btn btn-outline-info'>View More</Link>
                        </div>

                      </Card.Body>
                    </Card>
                  </Col>
                ))
              }


            </Row> :
            <h2 className='text-center text-danger'>No Post Added Yet !!</h2>
        }

      </div>
    </>
  )
}

export default Home