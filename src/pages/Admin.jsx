import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Chart from '../components/Chart'
import Table from 'react-bootstrap/Table';
import { useNavigate, Link } from 'react-router-dom';
import { getReportsApi, deletePostApi, removeReport, getOtherRepApi, delOtherRepApi, getAllUsers, getAllPosts } from '../services/allapis';
import toast from 'react-hot-toast';
import './admin.css'


function Admin() {
    const date=new Date()
    // console.log(date.toLocaleString());

    const [data, setData] = useState([])
    const [val, setVal] = useState([])
    const [userCount, setUserCount] = useState('')
    const [postCount, setPostCount] = useState('')

    const nav = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("admin")) {
            nav('/admin')
        } else {
            nav('/home')
        }
    }, [])

    useEffect(() => {
        displayReports()
        getOtherReports()
        handleUsersCount()
        handlePostCount()
    }, [])



    const displayReports = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getReportsApi(header)
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }

    }

    const handleRemoveFromDB = async (postId, id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res1 = await deletePostApi(header, postId)
        // console.log(res1);
        if (res1.status == 200) {
            handleIgnore(id)
        } else {
            console.log(res1);
            toast.error("Something Went Wrong")
        }

    }

    const handleIgnore = async (id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res2 = await removeReport(header, id)
        if (res2.status == 200) {
            toast.success("Removed")
            displayReports()
        } else {
            console.log(res2);
            toast.error("Something Went Wrong")

        }
    }

    const getOtherReports = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getOtherRepApi(header)
        // console.log(res);
        if (res.status == 200) {
            setVal(res.data)
        } else {
            console.log(res);
        }

    }

    const handleOtherDel = async (id) => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res3 = await delOtherRepApi(header, id)
        // console.log(res3);
        if (res3.status == 200) {
            toast.success("Deleted")
            getOtherReports()
        } else {
            console.log(res3);
            toast.error("Something Went Wrong")
        }

    }


    const handleHome = async () => {
        sessionStorage.removeItem('admin')
        nav('/home')
    }

    const handleUsersCount = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getAllUsers(header)
        // console.log(res);
        if (res.status == 200) {
            setUserCount(res.data.length)
        }

    }

    const handlePostCount = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const search = ""
        const res = await getAllPosts(header, search)
        // console.log(res);
        if (res.status == 200) {
            setPostCount(res.data.length)
        }

    }

    // console.log(data);
    // console.log(val);
    // console.log(userCount);
    // console.log(postCount);


    return (
        <>


            <div className='container-fluid d-flex justify-content-between mb-3  py-3 align-items-center' style={{ backgroundColor: "#33284d" }}>
                <div>
                    <h2 className='ms-2 text-light'>Admin Dashboard</h2>
                </div>
                <div>
                    <button className='btn  me-2' onClick={handleHome} style={{backgroundColor:"#f0eff8"}} >
                        <i className="fa-regular fa-share-from-square me-2" style={{ color: "black", }} />
                        Home
                    </button>
                </div>
            </div>


            <div className='container-fluid ' style={{ width: "100%" }}>
                <Row className='my-4 d-flex align-items-center' style={{ justifyContent: "space-evenly" }}>

                    <Col lg={4} md={4} sm={12} className='  d-flex justify-content-center align-items-center '>
                        <div className='banner my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem",minHeight:"180px" }}>
                            <div className='d-flex'>
                                <i className="fa-solid fa-users fa-2x   me-2" style={{ color: "#B197FC", }} />
                                <h3>Total Users</h3>
                            </div>
                            {/* <h4>{userCount}</h4> */}
                            <h4>26</h4>
                        </div>
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className='banner my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem",minHeight:"180px" }}>
                            <div className='d-flex'>
                            <i className="fa-solid fa-image fa-2x me-2" style={{ color: "#B197FC", }}/>                                
                            <h3>Total Posts</h3>
                            </div>
                            <h4>{postCount}</h4>
                        </div>
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center '>
                        <div className='banner my-3  d-flex justify-content-center flex-column align-items-center  text-center shadow ' style={{ borderRadius: "20px", paddingTop: "25px", paddingBottom: "25px", width: "18rem" ,minHeight:"180px" }}>
                            <div className='d-flex'>
                            <i className="fa-regular fa-flag fa-2x me-2" style={{color: "#B197FC",}} />
                                <h3>Total Reports</h3>
                            </div>
                            <h4>{data?.length}</h4>
                        </div>
                    </Col>

                    <Col lg={7} md={8} sm={12} className='mt-3'>
                        <Chart />
                    </Col>

                    <Col lg={4} md={4} sm={12} className=' d-flex justify-content-center align-items-center p-3 '>
                       
                        <div id='calender' className=' border px-5 d-flex flex-column rounded shadow py-5 justify-content-center align-items-center ' style={{height:"100%"}}>
                            <h2>{date.toLocaleDateString('en-GB')}</h2>
                            <h4>{date.toLocaleString('en-US',{weekday:"long"})}</h4>
                            <h4 className='mt-2'>{date.toLocaleTimeString('en-US',{timeStyle:'short',hourCycle:"h12"})}</h4>
                        </div>
                    </Col>

                </Row>

            </div>

            <div className='container-fluid my-3'>
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <div className='container-fluid py-3 mt-3 shadow rounded' style={{ height: "90vh", overflowY: "scroll" }}>
                            <h3>Post Reports
                                <i className="fa-solid fa-triangle-exclamation fa-md ms-2" style={{ color: "#B197FC", }} />
                            </h3>
                            {
                                data?.length > 0 ?
                                    <Table responsive className='table mt-3 table-hover text-center '>
                                        <thead>
                                            <tr>
                                                {/* <th>UserId</th> */}
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.map((item, index) => (
                                                    <tr key={item?._id}>
                                                        <td>{index + 1}</td>
                                                        <th>
                                                            <Link to={`/view/${item?.postId}`} className='btn ' id='dashbtn' style={{ width: "max-content" }} >
                                                                View Post
                                                                <i className="fa-regular fa-sm ms-1 fa-file" />
                                                            </Link>
                                                        </th>
                                                        <th>
                                                            <button className='btn ' onClick={() => { handleIgnore(item?._id) }} style={{ width: "max-content" }} id='dashbtn2' >
                                                                Reject
                                                                <i className="fa-solid fa-xmark fa-lg ms-1" />
                                                            </button>
                                                        </th>
                                                        <th>
                                                            <button className='btn btn-outline-danger ' onClick={() => { handleRemoveFromDB(item?.postId, item?._id) }} style={{ width: "max-content" }} >
                                                                {/* <i className="fa-solid fa-trash fa-lg" style={{ color: "#cb153a", }} /> */}
                                                                Remove From Database
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </Table>
                                    :
                                    <h4 className='text-center'>No Reports Yet</h4>
                            }

                        </div>
                    </Col>

                    <Col lg={4} md={12} sm={12}>
                        <div className='container-fluid border rounded p-3 mt-3 shadow' style={{ height: "90vh", overflowY: "scroll" }} >
                            <h5>User Reports !</h5>

                            {
                                val?.length > 0 ?
                                    val.map((item) => (
                                        <div key={item?._id} className='container-fluid mt-3 w-100 border rounded p-2'>
                                            <div className='d-flex justify-content-between'>
                                                <h6 className='mt-2'>userID : <span style={{ color: "blue" }}>{item?.userId}</span> </h6>
                                                <button className='btn  ' onClick={() => { handleOtherDel(item?._id) }} >
                                                    <i className="fa-solid fa-trash fa-md" style={{ color: "#cb153a", }} />
                                                </button>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>{item?.problem}</p>
                                        </div>
                                    ))
                                    :
                                    <h4 className='text-center'>No Reports Yet</h4>
                            }



                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Admin