import React , { useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { adminLogApi } from '../services/allapis';
import toast from 'react-hot-toast';

function AdminComponent() {
    const [show, setShow] = useState(false);
    const[val,setVal]=useState({
        email:"",password:""
    })
    const nav=useNavigate()
    const handleAdminLogin=async()=>{
        // console.log(val);
        const {email,password}=val
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        if(!email || !password){
            toast.error("Enter Valid Inputs")
        }else{
            const res=await adminLogApi(header,val)
            // console.log(res);
            if(res.status==200){
                sessionStorage.setItem('admin',true)
                toast.success("Login Success")
                nav('/admin')
                setVal({ email:"",password:""})
                handleClose()

            }else if(res.status==404){
                toast.error("Incorrect Email or Password")
            }else{
                toast.error("Something Went Wrong")
            }
            
        }
    }

   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Link className='mb-4 offlink' onClick={handleShow} >
                <i className="fa-solid fa-eye fa-lg me-2" style={{ color: "#0a0a0a", }} />
                Admin
            </Link>


         {/* modal */}
         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel controlId="Email" label="Email">
                        <Form.Control type="email" placeholder="" className='mb-3' onChange={(e)=>{setVal({...val,email:e.target.value})}} />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password">
                        <Form.Control type="password" placeholder="" className='mb-3' onChange={(e)=>{setVal({...val,password:e.target.value})}} />
                    </FloatingLabel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAdminLogin} >LogIn</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AdminComponent