import React,{ useState ,useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Report from './Report';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import toast from 'react-hot-toast';
import { logoutResponseContext } from '../conext/Context';
import AdminComponent from './AdminComponent';
import './Profile.css'

function Profile() {
    const [show, setShow] = useState(false);
    const nav=useNavigate()
    const {setLog}=useContext(logoutResponseContext)


    const handleLogout=async()=>{
        toast.success("Logout")
        sessionStorage.clear()
        nav('/')
        setLog(false)
       
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <button className='btn' onClick={handleShow} id='btnhome'>
                <i className="fa-solid fa-user fa-md me-1" />
                Account
            </button>



            <Offcanvas placement='end' show={show} onHide={handleClose} backdrop="static" style={{ width: "250px" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='' style={{ fontSize: "25px" }}>
                        <i className="fa-solid fa-house-chimney fa-md me-2" style={{ color: "#050505", }} />
                        {sessionStorage.getItem("username")}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column'>
                        <Link className='mb-4 offlink' to={'/acc'} >
                        <i className="fa-solid fa-user fa-lg me-2" style={{color: "#121212",}} />
                            Account
                        </Link>
                        <Link className='mb-4 offlink' to={"/chat"} >
                            <i className="fa-regular fa-message fa-lg me-2" style={{ color: "#0a0a0a", }} />
                            Messages
                            {/* <Badge bg="primary" className='ms-2 rounded'>5 +</Badge> */}
                        </Link>
                        <Link className='mb-4 offlink' to={'/save'} >
                            <i className="fa-regular fa-bookmark fa-lg me-2" style={{ color: "#0d0d0d", }} />
                            Saved
                        </Link>

                        <Report />

                        <AdminComponent/>
                        
                        <Link className='mb-4 offlink' onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket fa-lg me-2" style={{ color: "#0a0a0a", }} />
                            Logout
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

export default Profile