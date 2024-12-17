import { Routes,Route } from 'react-router-dom';
import View from './pages/View';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Account from './pages/Account';
import Save from './pages/Save';
import Admin from './pages/Admin';
import  { Toaster } from 'react-hot-toast';
import { useContext,useEffect } from 'react';
import { logoutResponseContext } from './conext/Context';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const {setLog,log}=useContext(logoutResponseContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLog(true)
    }else{
      setLog(false)
    }
  },[])

  

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/home' element={log?<Home/>:<Auth/>} />
      <Route path='/acc' element={log?<Account/>:<Auth/>} />
      <Route path='/save' element={log?<Save/>:<Auth/>} />
      <Route path='/view/:id' element={log?<View/>:<Auth/>} />
      <Route path='/chat' element={log?<Chat/>:<Auth/>} />
      <Route path='/admin' element={log?<Admin/>:<Auth/>} />


    </Routes>
    <Toaster/>
   
    </>
  )
}

export default App
