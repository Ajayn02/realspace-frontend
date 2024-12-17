import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getSavedApi, unsaveApi } from '../services/allapis';
import toast from 'react-hot-toast';
import base_url from '../services/base_url';


function Save() {
    const [data, setData] = useState({})

    useEffect(() => {
        displayData()
    }, [])


    const displayData = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getSavedApi(header)
        // console.log(res);
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }

    }

    const handleUnsave = async (id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res1 = await unsaveApi(header, id)
        // console.log(res1);
        if (res1.status == 200) {
            toast.success("Unsaved")
            displayData()
        } else {
            console.log(res1);
            toast.error("Something Went Wrong")
        }

    }

    return (
        <>
            <div className='container p-2  rounded  my-5' style={{ minHeight: "100vh" }}>


                <Row>
                    <h2 className='my-3 ms-2'>
                        <i className="fa-regular fa-bookmark fa-sm me-2" style={{ color: "#0a0a0a", }} />
                        Saved
                    </h2>
                    {
                        data?.length > 0 ?
                            data.map(item => (
                                <Col key={item._id} lg={3} md={6} sm={12} className='d-flex justify-content-center align-items-center  p-0'>
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
                                                <button className='btn btn-outline-danger px-2' onClick={() => { handleUnsave(item._id) }} >Unsave</button>
                                                <Link to={`/view/${item.postId}`} className='btn btn-outline-info px-2'>View More</Link>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))

                            :
                            <h3 className='text-center text-danger mt-5'>No Items Saved Yet</h3>
                    }


                </Row>



            </div>
        </>
    )
}

export default Save