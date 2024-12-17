import React, { useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { getchatsApi, getOneChatApi, sendChatApi,delChatAPi } from '../services/allapis';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import base_url from '../services/base_url';
import userimg from '../icons/userimg.png'
import './chat.css'


const socket = io.connect("http://localhost:3001")



function Chat() {
    const [show, setShow] = useState(true);
    const [chatData, setChatData] = useState([])
    const [userChat, setUserChat] = useState([])
    const [message, setMessage] = useState({
        send: "", content: ""
    })
    const [newMessage, setNewMessage] = useState([])
    const [response, setResponse] = useState("")

    const [val,setVal]=useState({name:""})



    useEffect(() => {

        socket.on("receive_msg", (data) => {
            if (data.send !== sessionStorage.getItem("username")) {
                setNewMessage(data)
                // console.log(data);
            }
            //  else {
            //   console.log("condition failed in useEffect");
            // }
        })
    }, [socket])


    useEffect(() => {
        displayChats()
    }, [newMessage])

    useEffect(() => {
        if (sessionStorage.getItem('chatid')) {
            setShow(false)
            displaySpecificChat()
            setNewMessage("")

        }
    }, [response, newMessage])

    useEffect(()=>{
        if(newMessage.receiverName){
            setVal({...val,name:newMessage.receiverName})
        }
    },[newMessage])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const displayChats = async () => {
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getchatsApi(header)
        // console.log(res);
        if (res.status == 200) {
            setChatData(res.data)
        }

    }

    const handleChatmsg = async (id) => {
        setUserChat([])
        sessionStorage.setItem("chatid", id)
        displaySpecificChat()
        handleClose()
    }

    const displaySpecificChat = async () => {

        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const id = sessionStorage.getItem("chatid")
        const res5 = await getOneChatApi(header, id)
        // console.log(res5);
        if (res5.status == 200) {
            setUserChat(res5.data)
            // socket.emit("roomId", id)
            sessionStorage.setItem("receiverName", res5.data.sendName === sessionStorage.getItem("username") ? res5.data.receiveName : res5.data.sendName)
        } else {
            console.log(res5);
        }

    }


    const sendMsg = async (id) => {
        setNewMessage([])
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const { content, send } = message
        const emitingData = {
            content: content,
            send: send,
            roomId: sessionStorage.getItem("chatid"),
            receiverName: sessionStorage.getItem("receiverName")
        }

        if (!content || !send) {
            toast.error("Enter Valid Inputs")
        } else {
            socket.emit("newmsg", emitingData)
            const result = await sendChatApi(header, message, id)
            // console.log(result);
            if (result.status == 200) {
                setResponse(result)
                setMessage({ send: "", content: "" })
            } else {
                console.log(result);
            }
        }

    }

    const handleDelChat=async(id)=>{
        const header = {
            'Content-Type': "application/json",
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res6=await delChatAPi(header,id)
        console.log(res6);
        if(res6.status==200){
            toast.success("Chat Deleted")
            sessionStorage.removeItem("chatid")
            // displaySpecificChat()
            setUserChat("")
            setShow(true)
            displayChats()
        }else{
            console.log(res6);
            toast.error("Something Went Wrong")
        }
        
        
    }


    //   console.log(userChat);
    // console.log(newMessage);
    // console.log(chatData);
    


    return (
        <>
            <div className='container-fluid ' style={{ minHeight: "100vh", backgroundColor: "#f0f1fd" }}>
                <button className="btn   mx-3 my-3" onClick={handleShow} id='msgbtn'>
                <i className="fa-regular fa-message fa-lg me-2"  />
                    Messages
                </button>

                {
                    userChat?.sendName ?
                        <>
                            {/* Messsages */}
                            <div className='container-fluid  d-flex justify-content-between  p-0' style={{ width: "100%" }}>
                                {/* head */}
                                <div className='d-flex  align-items-center px-2  my-0' style={{ height: "13vh", width: "100%", backgroundColor: "#f0f1fd" }} >
                                    <img src={userChat.sendName === sessionStorage.getItem('username') ? `${base_url}/uploads/${userChat.receiveProfile}` : `${base_url}/uploads/${userChat.sendProfile}`?`${base_url}/uploads/${userChat.sendProfile}`:userimg} alt="" width={"70x"} height={"70px"} className='ms-3' style={{ border: "1px solid black", borderRadius: "60px" }} />
                                    <div className='d-flex justify-content-center mt-2' style={{ flexDirection: "column" }}>
                                        <h5 className='ms-3'>{userChat?.sendName === sessionStorage.getItem("username") ? userChat.receiveName : userChat.sendName}</h5>
                                    </div>
                                </div>

                                <div>
                                    <button className='btn clctbtn d-flex mt-3 me-3' style={{width:"max-content"}} onClick={()=>{handleDelChat(userChat?._id)}} id='clctbtn'>
                                    {/* <i className="fa-solid fa-trash fa-lg " style={{color: "#be3752",}} /> */}
                                    Clear Chat
                                    </button>
                                </div>
                            </div>

                            {/* chat */}
                            <div className=' m-0 pt-2' style={{ width: "100%", height: "64vh", overflowY: "scroll", backgroundColor: "#f0f1fd" }}>

                                {
                                    userChat.message.length > 0 ?
                                        userChat.message.map(item => (
                                            <div key={item.send} className={item.send == sessionStorage.getItem('username') ? 'border  my-2 mx-2 ms-auto text-light p-2 text-end me-1' : 'border   me-auto mx-2 my-2 p-2'} style={item.send == sessionStorage.getItem('username') ? { maxWidth: "300px", borderRadius: " 10px 10px 0px 10px", backgroundColor: "#6f5ad1" } : { maxWidth: "300px", borderRadius: " 10px 10px 10px 0px", backgroundColor: "#ced1f7" }}>
                                                {item.content}
                                            </div>
                                        ))
                                        :
                                        <h3 className='text-center'>No messages</h3>
                                }

                                {
                                    newMessage.receiverName === sessionStorage.getItem("username") && newMessage.send === sessionStorage.getItem("receiverName") &&
                                    <div className='border   me-auto mx-2 my-2 p-2' style={{ maxWidth: "300px", borderRadius: " 10px 10px 10px 0px", backgroundColor: "#ced1f7" }}>
                                        {newMessage.content}
                                    </div>
                                }



                            </div>

                            {/* input */}
                            <div className='container-fluid   d-flex justify-content-center align-items-center py-3' style={{ width: "100%", height: "10vh", backgroundColor: " #f0f1fd" }}>
                                <input type="text" className='form-control me-3' placeholder='Type Your Message' style={{ height: "45px", maxWidth: "700px" }} onChange={(e) => { setMessage({ ...message, content: e.target.value, send: sessionStorage.getItem("username") }) }} value={message.content} />
                                <button className='btn   py-2 ' style={{ borderRadius: "50%", border: "2px solid #272145" }} onClick={() => { sendMsg(userChat._id) }} >
                                    <i className="fa-regular fa-paper-plane fa-lg" style={{ color: "#272145", }} />
                                </button>
                            </div>
                        </>
                        :
                        <h2 className='text-center'>Tap to get chats</h2>
                }



            </div>


            <Offcanvas show={show} onHide={handleClose} backdrop="static" style={{ width: "320px", height: "100vh" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className='container-fluid py-0 px-0' style={{ width: "100%" }}>
                            {/* my account */}
                            <div className='d-flex mt-3 container  align-items-center  py-3 px-2' style={{ cursor: "pointer", width: "100%" }}>
                                <img src={sessionStorage.getItem("profile")?`${base_url}/uploads/${sessionStorage.getItem("profile")}`:userimg} alt="" width={"70px"} height={"70px"} className='ms-3' style={{ border: "1px solid black", borderRadius: "40px" }} />

                                <div className='d-flex justify-content-center ' style={{ flexDirection: "column" }}>
                                    <h5 className='ms-3' >{sessionStorage.getItem("username")}</h5>
                                    <Link className='ms-3' to={'/acc'}>
                                        My Account
                                        <i className="fa-solid fa-gear ms-1" style={{ color: "#0c0d0d", }} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* allchats */}
                    <h6 className='ms-4 py-2'>Messages</h6>

                    <div className='d-flex flex-column  ' style={{ cursor: "pointer", overflowY: "scroll", height: "59vh" }}  >

                        {/* chat */}
                        {
                            chatData.length > 0 ?
                                chatData.map((item) => (
                                    <div className='d-flex mb-3' key={item._id} onClick={() => { handleChatmsg(item._id) }} >
                                        <img src={item.sendName === sessionStorage.getItem('username') ? `${base_url}/uploads/${item.receiveProfile}` : `${base_url}/uploads/${item.sendProfile}`?`${base_url}/uploads/${item.sendProfile}`:userimg} alt="" width={"60px"} height={"60px"} className='ms-3' style={{ border: "1px solid black", borderRadius: "50px" }} />

                                        <div className='d-flex justify-content-center mt-2' style={{ flexDirection: "column" }}>
                                            <h5 className='ms-3'>{item.sendName === sessionStorage.getItem('username') ? item.receiveName : item.sendName}</h5>
                                        </div>

                                        {
                                            // val.name===sessionStorage.getItem("username") &&
                                            // <div className='ms-auto mt-3'>
                                            // <Badge bg='' className='ms-auto me-3' style={{ backgroundColor: "#796edd" }} >
                                            // <i className="fa-solid fa-circle" style={{color: "#B197FC",}} />
                                            // </Badge>
                                            // </div>
                                        }
                                       
                                    </div>
                                ))
                                :
                                <p className='text-center'>No chats</p>
                        }





                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Chat