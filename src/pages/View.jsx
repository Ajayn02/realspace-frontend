import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getViewPost } from '../services/allapis'
import base_url from '../services/base_url'
import { addSaveApi, addchatApi, addReportApi } from '../services/allapis'
import toast from 'react-hot-toast'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./view.css"

function View() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);

    const { id } = useParams()
    const nav = useNavigate()
    // const{setTargetedUser}=useContext(chatResponse)

    useEffect(() => {
        handleDisplay()
    }, [])


    const handleDisplay = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getViewPost(header, id)
        // console.log(res);
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }
    }

    // console.log(data);

    const handleAddSave = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res1 = await addSaveApi(header, data)
        // console.log(res1);
        if (res1.status == 200) {
            toast.success("Saved")
        } else if (res1.status == 406) {
            toast.error("Already Saved")
            console.log(res1);
        } else {
            toast.error("Something Went Wrong")
            console.log(res1);
        }

    }


    const handleMsg = async (id) => {
        const chatdata = { receiveId: id }
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res2 = await addchatApi(header, chatdata)
        // console.log(res2);
        if (res2.status == 200) {
            // console.log(res2.data);
            sessionStorage.setItem("chatid", res2.data._id)
            // setTargetedUser(res2.data)
            nav('/chat')
        } else if (res2.status == 406) {
            // setTargetedUser(res2.response.data)
            // console.log(res2);
            sessionStorage.setItem("chatid", res2.response.data._id)
            nav('/chat')
        } else if (res2.status == 404) {
            toast.success("Its Your Post !")
        }
        else {
            console.log(res2);
            toast.error("Something Went Wrong")
        }

    }

    const handleReport = async (id) => {
        // console.log(id);
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const postID = { postId: id }
        const res = await addReportApi(header, postID)
        console.log(res);
        if (res.status == 200) {
            toast.success("Reported")
            handleClose()
        } else if (res.status == 406) {
            toast.error("Already Reported By You")
            handleClose()
        } else {
            toast.error("Something Went Wrong")
        }


    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>


            <div className='container-fluid d-flex justify-content-center  align-items-center' style={{ height: "100vh" }}>
                <Row className='container-fluid'>
                    <Col sm={12} md={6} className=' d-flex justify-content-center align-items-center'>
                        <img src={`${base_url}/uploads/${data?.image}`} alt="" width={'100%'} style={{ padding: "20px" }} />
                    </Col>
                    <Col sm={12} md={6} className=' d-flex justify-content-center  flex-column ' style={{ padding: "20px" }} >
                        <h1 className='mb-2'>{data?.title}</h1>
                        <h6 className='mb-3'>
                            <i className="fa-solid fa-location-dot fa-lg me-2" style={{ color: "#999993", }} />
                            <span style={{ color: "#999993" }}>{data?.location}</span>
                        </h6>
                        <h6>₹ {data?.price}</h6>
                        <h6 className='mb-3'>{data?.area} sq.ft</h6>
                        <p>Apartment Types : {data?.apartment}</p>
                        <p>{data?.specialities}</p>
                        <p> {data?.landmark}</p>

                        <div className='d-flex' >

                            <Link to={`${data?.googlemap}`} target='_blank' className='btn  viewbtn mt-2 me-3 ' id='loc' >
                                <span>
                                    <i className="fa-solid fa-location-dot fa-lg" />
                                </span>
                            </Link>
                            <button className='btn viewbtn text-light mt-2  me-3' id='msg' onClick={() => { handleMsg(data?.userId) }} >
                                <span>
                                    <i className="fa-regular fa-message fa-lg me-2" style={{ color: "black", }} />

                                </span>
                            </button>

                            <button className='btn  viewbtn  me-3 mt-2' id='save' onClick={handleAddSave} >
                                <span>
                                    <i className="fa-regular fa-bookmark fa-lg me-2" style={{ color: "", }} />

                                </span>
                            </button>

                            <button className='btn  viewbtn  mt-2' id='rep' onClick={handleShow} >
                                <span>
                                    <i className="fa-regular fa-flag fa-lg" style={{ color: "#050505", }} />

                                </span>
                            </button>


                        </div>
                    </Col>
                </Row>
            </div>





            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 className=''>Are you Sure ?</h5>
                    <Button variant="secondary" className='mt-3' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" className='ms-2 mt-3' onClick={() => { handleReport(data?._id) }} >Report</Button>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default View