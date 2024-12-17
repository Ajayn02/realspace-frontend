import React, { useState,useEffect,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addPostApi } from '../services/allapis';
import toast from 'react-hot-toast';
import { addResponseContext } from '../conext/Context';

function AddProperty() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        title: "", location: "", price: "", area: "", apartment: "", specialities: "", landmark: "", googlemap: "", image: ""
    })
    const [preview,setPreview]=useState("")
    const {setAddResponse}=useContext(addResponseContext)

    useEffect(()=>{
        if(data.image){
            setPreview(URL.createObjectURL(data.image))
        }else{
            setPreview('')
        }
    },[data.image])

    const handleAddPost = async () => {
        const { title, location, price, area, apartment, specialities, landmark, googlemap, image } = data
        if (!title || !location || !price || !area || !apartment || !specialities || !landmark || !googlemap) {
            toast.error("Enter Valid Inputs")
        } else {

            const header = {
                'Content-Type': "multipart/form-data",
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
            const fd = new FormData()
            fd.append('title', title)
            fd.append('image', image)
            fd.append('location', location)
            fd.append('price', price)
            fd.append('area', area)
            fd.append('apartment', apartment)
            fd.append('specialities', specialities)
            fd.append('landmark', landmark)
            fd.append('googlemap', googlemap)

            const res = await addPostApi(header, fd)
            // console.log(res);
            if(res.status==200){
                toast.success("Post Added Successfully")
                setAddResponse(res)
                handleClose()
            }else{
                toast.error('Post Adding Failed')
                console.log(res);
            }
        }
    }


    const handleClose = () => {
        setData({ title: "", location: "", price: "", area: "", apartment: "", specialities: "", landmark: "", googlemap: "", image: ""})
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-success ms-5' onClick={handleShow}>Add Post +</button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel controlId="title" label="Title">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, title: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="Location" label="Location">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, location: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="Price" label="Price">
                        <Form.Control type="number" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, price: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="area" label="Area in Sq ft">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, area: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="apttype" label="Apartment Type">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, apartment: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="speacialities" label="Specialities">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, specialities: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="nearBy" label="Nearly Landmarks">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, landmark: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="gmap" label="Google Map Link">
                        <Form.Control type="text" placeholder="" className='mb-3' onChange={(e) => { setData({ ...data, googlemap: e.target.value }) }} />
                    </FloatingLabel>

                    <label >
                        <input type="file" style={{ display: "none" }} onChange={(e) => { setData({ ...data, image: e.target.files[0] }) }} />
                        <img src={preview?preview:"https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-upload-cloud-vector-icon-png-image_1027251.jpg" }alt="" width={"30%"} style={{ cursor: "pointer" }}  className='me-3'/>
                        Add images +
                    </label>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddPost}>Add</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AddProperty