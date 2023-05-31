import React, { useState } from 'react'
import {useEffect} from 'react';
import { useNavigate ,useLocation, Link} from 'react-router-dom'
import {BiLogOut} from "react-icons/bi"
import {IoIosCreate} from "react-icons/io"
import axios from 'axios';
import swal from 'sweetalert'

function Header() {

  const [userData, setUserData] = useState({})
    const navigate = useNavigate();
  const location = useLocation();
  const auth = localStorage.getItem('token')


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
setUserData(response.data.data)
})
.catch((error) => {
  console.log(error);
});
}, []);

const handleLogout = () =>{
    swal({
      title: "Are you sure to Logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('token')
        navigate('/login')
      } 
    });
}




 if (userData.role == 'user') {
  var createPostlable = <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
<Link to={'/post'} style={{textDecoration:"none",color:"black"}}>Create Post <IoIosCreate size={25}/></Link>
 </div> 
 }
  


  return (
    <>
 <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <div className="navbar-brand d-flex">
      <img src= {userData.profile} alt='' width="60" height="60" className="d-inline-block align-text-top rounded-circle"/>
      <h5 className='mt-3 ms-2' >{userData.first_name} {userData.last_name}</h5>
    </div>
    {/* <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
   <Link to={'/post'} style={{textDecoration:"none",color:"black"}}>Create Post <IoIosCreate size={25}/></Link>
    </div>  */}
    {createPostlable}
    <a className="navbar-brand" style={{cursor:"pointer"}} onClick={handleLogout}>
     Logout <BiLogOut />
    </a>
  </div>
</nav>
    </>
  )
}

export default Header