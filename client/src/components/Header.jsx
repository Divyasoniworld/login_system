import React, { useState } from 'react'
import {useEffect} from 'react';
import { useNavigate ,useLocation, Link} from 'react-router-dom'
import {BiLogOut} from "react-icons/bi"
import {IoIosCreate} from "react-icons/io"
import axios from 'axios';

function Header() {

  const [userData, setUserData] = useState({})
    const navigate = useNavigate();
  const location = useLocation();
  const auth = localStorage.getItem('token')

//  const profile = (location.state.profile != null) ? location.state.profile : "default.jpg"

useEffect(() => {
  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:9595/api/v1/auth/singleuser',
      headers: { 
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
        'token' : `${auth}`,
        'Content-Type': 'application/json'
      }
    };
    
axios.request(config)
.then((response) => {
  // console.log('response',response);
setUserData(response.data.data)
 
})
.catch((error) => {
  console.log(error);
});
}, []);

  useEffect(() => {
    if (!auth) {          
      navigate('/login')
    } 
  }, [navigate, auth]);


  return (
    <>
 <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <div className="navbar-brand">
      <img src= {userData.profile} alt='' width="60" height="60" className="d-inline-block align-text-top rounded-circle"/>
    </div>
    <a className="navbar-brand" href="#">
       {userData.first_name}
    </a>
    <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
   <Link to={'/post'} style={{textDecoration:"none",color:"black"}}>Create Post <IoIosCreate size={25}/></Link>
    </div> 
    <a className="navbar-brand"  onClick={()=>{
      localStorage.removeItem('token')
      navigate('/login')
    }}>
     Logout <BiLogOut />
    </a>
  </div>
</nav>
    </>
  )
}

export default Header