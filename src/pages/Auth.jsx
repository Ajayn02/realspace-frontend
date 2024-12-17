import React, { useState ,useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import log from '../icons/log.jpg'
import reg from '../icons/register.jpg'
import { registerApi ,loginApi } from '../services/allapis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logoutResponseContext } from '../conext/Context';
import './Auth.css'


function Auth() {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({
        email: "", password: "", username: "",image:"",background:""
    })
    const {setLog}=useContext(logoutResponseContext)
    const nav=useNavigate()

    const handleAuth = () => {
        setAuth(!auth)
    }

    const handleRegister = async () => {
        const { username, password, email } = user
        if (!username || !password || !email) {
            toast.error("Enter Valid Inputs")
        } else {
            const res = await registerApi(user)
            // console.log(res);
            if (res.status == 200) {
                toast.success("Register Success")
                setUser({
                    email: "", password: "", username: "",image:"",background:""
                })
                handleAuth()
            }else{
                toast.error("Email Already In Use")
            }

        }
    }

    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.error("Enter Valid Inputs")
        }else{
            const res1= await loginApi(user) 
            // console.log(res1);
            if(res1.status==200){
                setLog(true)
                toast.success("Login Success")
                sessionStorage.setItem("token",res1.data.token)
                sessionStorage.setItem("username",res1.data.username)
                sessionStorage.setItem("profile",res1.data.profile)
                setUser({ email: "", password: "", username: ""})
                nav("/home")
            }else{
                toast.error("Invalid Username or Password")
            }
            
        }
    }

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center ' style={{ minHeight: "85vh" }}>
                <div className='shadow p-3 rounded authcon' >
                    <Row>
                        <Col lg={6} md={6} sm={12} className='d-flex justify-content-center align-items-center  '>
                            <img src={auth ? reg : log} width={"100%"} alt="" />
                        </Col>
                        <Col lg={6} md={6} sm={12} className='d-flex justify-content-center align-items-center ' style={{ flexDirection: "column" }}>

                            <div className='container mt-3'>
                                {
                                    auth ? <h3 className='text-center mb-3'>Register</h3>
                                        : <h3 className='text-center mb-3'>Login</h3>
                                }

                                {
                                    auth &&
                                    <FloatingLabel controlId="username" label="Username" className='mb-3'>
                                        <Form.Control type="text" placeholder="" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                                    </FloatingLabel>
                                }

                                <FloatingLabel controlId="email" label="Email" className='mb-3'>
                                    <Form.Control type="email" placeholder="" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="password" label="Password" className='mb-3'>
                                    <Form.Control type="password" placeholder="" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                                </FloatingLabel>
                                <div className='d-flex justify-content-between my-4'>
                                    {
                                        auth ? <Link onClick={handleAuth}>Already Have Account ?</Link>
                                            : <Link onClick={handleAuth}>New User ?</Link>
                                    }

                                    {
                                        auth ? <button className='btn btn-primary' onClick={handleRegister} >Register</button>
                                            : <Link  className='btn btn-primary' onClick={handleLogin}>Login</Link>
                                    }

                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth