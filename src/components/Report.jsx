import React , { useState }  from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addotherRepApi } from '../services/allapis';
import toast from 'react-hot-toast';


function Report() {
    const [show, setShow] = useState(false);
    const [data,setData]=useState({ problem:"" })



    const handleReport=async()=>{
        // console.log(data);
        const {problem}=data
        if(!problem){
            toast.error("Enter Valid Inputs")
        }else{
            const header = {
                'Content-Type': "application/json",
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
            const res=await addotherRepApi(header,data)
            if(res.status==200){
                toast.success("Report Send Successfully")
                handleClose()
                setData({problem:""})
            }else{
                console.log(res);
                toast.error("Something Went Wrong")
            }
            
        }
        
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Link className='mb-4 offlink'onClick={handleShow} >
                <i className="fa-regular fa-flag fa-lg me-2" style={{ color: "#050505", }} />
                Report
            </Link>


            {/* modal */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Report !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel controlId="problem" label="Enter Your Problem">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e)=>{setData({...data,problem:e.target.value})}} />
                    </FloatingLabel>

                    <Button variant="secondary" className='me-2' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleReport}>Report</Button>

                </Modal.Body>
               
            </Modal>
        </>
    )
}

export default Report