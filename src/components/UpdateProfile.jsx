import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import userimg from '../icons/userimg.png'
import { Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import base_url from '../services/base_url';
import { updateUserApi, getUserApi } from '../services/allapis';
import './UpdateProfile.css'

function UpdateProfile({ updatedUser }) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState({
        username: "", image: "", background: ""
    })
    const [imgPrev,setImgPrev]=useState('')
    const [bacPrev,setBacPrev]=useState('')

    useEffect(() => {
        handleUserInfo()
    }, [])

    useEffect(()=>{
        if(edit.image.type){
            setImgPrev(URL.createObjectURL(edit.image))
        }else{
            setImgPrev('')
        }
    },[edit.image])

    useEffect(()=>{
        if(edit.background.type){
            setBacPrev(URL.createObjectURL(edit.background))
        }else{
            setBacPrev('')
        }
    },[edit.background])

    const handleUserInfo = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getUserApi(header)
        // console.log(res);
        if (res.status == 200) {
            setEdit({ ...edit, username: res.data[0].username, image: res.data[0].image, background: res.data[0].background })
        } else {
            console.log(res);
        }


    }

    const updateUser = async () => {
        // console.log(edit);
        const { image, background, username } = edit
        if (!image || !background || !username) {
            toast.error("Enter Valid Inputs")
        } else {
            if (image.type || background.type) {

                const header = {
                    'Content-Type': "multipart/form-data",
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const fd=new FormData()
                // fd.append("username",username)
                fd.append("image",image)
                fd.append("background",background)
                const res1=await updateUserApi(header,fd)
                // console.log(res1);
                if(res1.status==200){
                    toast.success("Updated")
                    // sessionStorage.setItem("username",edit.username)
                    updatedUser(res1)
                    setEdit({ username: "", image: "", background: ""})
                    handleClose()
                    handleUserInfo()
                }else{
                    toast.error("Something Went Wrong")
                    console.log(res1);

                }
                
            }else{
                // console.log(edit);
                
                const header = {
                    'Content-Type': "application/json",
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res1=await updateUserApi(header,edit)
                // console.log(res1);
                if(res1.status==200){
                    toast.success("Updated")
                    // sessionStorage.setItem("username",edit.username)
                    updatedUser(res1)
                    setEdit({ username: "", image: "", background: ""})
                    handleClose()
                    handleUserInfo()
                }else{
                    toast.error("Something Went Wrong")
                    console.log(res1);

                }
                
            }
        }
    }


    const handleClose = () =>setShow(false);
   
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-warning  px-2 ' onClick={handleShow}>
                Update
                <i className="fa-solid fa-user ms-2" />
            </button>

            {/* modal */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}  >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body  >

                    <div className='d-flex row'>
                        <Col sm={6}>
                            <label className=' d-flex justify-content-center mt-3 align-items-center' style={{ flexDirection: "column" }}>
                                <input type="file" style={{ display: "none" }} onChange={(e) => { setEdit({ ...edit, image: e.target.files[0] }) }} />
                                <img src={imgPrev ? imgPrev : edit.image? `${base_url}/uploads/${edit.image}`:userimg } className='' width={"100px"} height={'100px'} alt="" style={{ cursor: "pointer",borderRadius:"50px" }} />
                                Profile Image
                            </label>
                        </Col>
                        <Col sm={6}>

                            <label className='mt-3 d-flex justify-content-center align-items-center' style={{ flexDirection: "column" }}>
                                <input type="file" style={{ display: "none" }} onChange={(e) => { setEdit({ ...edit, background: e.target.files[0] }) }} />
                                <img src={bacPrev ? bacPrev : edit.background? `${base_url}/uploads/${edit.background}` :"https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" } width={"100px"} height={'100px'}  alt="" style={{ cursor: "pointer",borderRadius:"50px" }} />
                                Cover Image
                            </label>
                        </Col>

                    </div>
                    {/* <div className='mx-3' style={{ width: "" }}>
                        <FloatingLabel controlId="floatingPssword" label="User Name">
                            <Form.Control type="text" placeholder="userName" className='my-3' defaultValue={edit.username} onChange={(e) => { setEdit({ ...edit, username: e.target.value }) }} />
                        </FloatingLabel>
                    </div> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateUser} >Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateProfile