import React, { useState, useEffect , useContext } from 'react'
import userimg from '../icons/userimg.png'
import UpdateProfile from '../components/UpdateProfile';
import AddProperty from '../components/AddProperty';
import Card from 'react-bootstrap/Card'; import './Account.css'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserPostApi , deletePostApi ,getUserApi } from '../services/allapis';
import base_url from '../services/base_url';
import toast from 'react-hot-toast';
import { addResponseContext } from '../conext/Context';

function Account() {
    const [post, setPost] = useState([])
    const [userUpdate,setUserUpdate]=useState('')
    const [user,setUser]=useState({
        username:"",image:"",background:""
    })
  
    const {addResponse}=useContext(addResponseContext)

    useEffect(() => {
        handlePosts()
    }, [addResponse])

    useEffect(()=>{
        getUser()
    },[userUpdate])

    const handlePosts = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getUserPostApi(header)
        // console.log(res);
        if (res.status == 200) {
            setPost(res.data)
        } else {
            console.log(res);
        }

    }

    const handleDeletePost=async(id)=>{
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res1=await deletePostApi(header,id)
        // console.log(res1);
        if(res1.status==200){
            toast.success("Post Deleted")
            handlePosts()
        }else{
            toast.error("Something Went Wrong")
            console.log(res1);
        }
        
    }

   const getUser=async()=>{
    const header = {
        'Content-Type': "application/json",
        'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
        const result=await getUserApi(header)
       
        if(result.status==200){
            // console.log(result.data);
            sessionStorage.setItem("profile",result.data[0].image)
            
            setUser({...user,username:result.data[0].username,image:result.data[0].image,background:result.data[0].background})
        }else{
            console.log(result);
            
        }
        
   }

    // console.log(user);
    

    return (
        <>
            <div className='container d-flex justify-content-center my-5 align-items-center' style={{ minHeight: "100vh" }}>
                <div id='accmain' className='container  p-1 d-flex justify-content-center align-items-center  ' >

                   <div className='border profilediv d-flex justify-content-center align-items-center w-100' style={{flexDirection:"column",backgroundImage:`url(${base_url}/uploads/${user.background})` , backgroundColor:"grey"}}>
                        <h2 className='text-center text-light mt-3'>{user.username}</h2>
                        <img className='my-3' src={user.image?`${base_url}/uploads/${user.image}`:userimg} width={'150px'} height={'150px'} style={{ border: "3px solid black", borderRadius: "85px" }} alt="" />
                        <div className='d-flex my-3'>
                            <UpdateProfile updatedUser={setUserUpdate} />
                            <AddProperty />
                        </div>
                   </div>

                    <h4 className='mt-4' style={{ textDecoration: "underline" }}>Posts</h4>
                    <Row className='w-100 '>
                        {
                            post?.length > 0 ?
                                post.map(item => (
                                    <Col key={item._id} lg={4} md={6} sm={12} className='d-flex justify-content-center align-items-center   p-0'>
                                        <Card style={{ width: '18rem' }} className='m-3 p-0'>
                                            <Card.Img variant="top" src={`${base_url}/uploads/${item.image}`} width={"100%"} height={"200px"} />
                                            <Card.Body>
                                                <Card.Title className=''>{item.title}</Card.Title>
                                                <Card.Text style={{ textAlign: "justify" }}>
                                                    <i className="fa-solid fa-location-dot me-2" style={{ color: "#999993", }} />
                                                    <span style={{ color: "#999993" }}>{item.location}</span>
                                                </Card.Text>

                                                <div className='d-flex justify-content-between'>
                                                    <h6 className='mt-2'>₹ {item.price}</h6>
                                                    <Link to={`/view/${item._id}`} className='btn btn-outline-info'>View More</Link>
                                                    <button className='btn ' onClick={()=>{handleDeletePost(item._id)}}>
                                                        <i className="fa-solid fa-trash fa-lg" style={{ color: "#9c1638", }} />
                                                    </button>
                                                </div>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                :
                                <h4 className='text-center mt-5'>No Post Added Yet</h4>
                        }


                    </Row>
                </div>
            </div>
        </>
    )
}

export default Account