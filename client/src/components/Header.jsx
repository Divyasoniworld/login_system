import React, { useState } from 'react'
import {useEffect} from 'react';
import { useNavigate ,useLocation, Link} from 'react-router-dom'
import {BiLogOut,BiUserCheck} from "react-icons/bi"
import {AiOutlineMessage} from "react-icons/ai"
import {BsSearchHeart} from "react-icons/bs"
import {IoIosCreate} from "react-icons/io"
import axios from 'axios';
import swal from 'sweetalert'

function Header(props) {
  const [userData, setUserData] = useState({})
  const [requestData, setRequestData] = useState([])
    const navigate = useNavigate();
  const location = useLocation();
  const auth = localStorage.getItem('token')
  const follow_id = localStorage.getItem('UserId');


useEffect(() => {
singleuser()
fetchAllRequest()
}, [requestData]);

const singleuser = () =>{
  let config = {
      method: 'post',
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
}

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

const fetchAllRequest = () =>{
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:9595/api/v1/all_request`,
    headers: {
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
        'token': `${auth}`,
        'Content-Type': 'application/json'
    },
    follow_id: follow_id
};

axios.request(config)
    .then((response) => {
        setRequestData(response.data.data)
    })
    .catch((error) => {
        console.log(error);
    });

}


if (userData.role == 'user') {
  var search = <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
<Link to={'/findone'} style={{textDecoration:"none",color:"black"}}>Search <BsSearchHeart size={25}/></Link>
 </div> 
 }



 if (userData.role == 'user') {
  var createPostlable = <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
<Link to={'/post'} style={{textDecoration:"none",color:"black"}}>Create Post <IoIosCreate size={25}/></Link>
 </div> 
 }

 if (userData.role == 'user') {
  var showmessages = <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
<Link to={'/messages'} style={{textDecoration:"none",color:"black"}}>Messages <AiOutlineMessage size={25}/></Link>
 </div> 
 }

 if (userData.role == 'user') {
  var userRequest = <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
<Link to={'/home/request'} style={{textDecoration:"none",color:"black"}}>Requests <span class="badge rounded-pill badge-notification bg-danger">{requestData.length > 0 ? requestData.length : ''}</span> <BiUserCheck size={25}/></Link>
 </div> 
 }
  


  return (
    <>
 <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <div className="navbar-brand d-flex">
    <Link to={'/home/posts'}> <img src= {userData.profile} alt='' width="60" height="60" className="d-inline-block align-text-top rounded-circle"/></Link>
      <Link to={'/home/profile'} className='mt-3 ms-2' style={{textDecoration:"none",color:"black"}}>{userData.first_name} {userData.last_name}</Link>
      {/* <h5 className='mt-3 ms-2' >{userData.first_name} {userData.last_name}</h5> */}
    </div>
    {/* <div style={{cursor:"pointer"}} className="navbar-brand d-flex">
   <Link to={'/post'} style={{textDecoration:"none",color:"black"}}>Create Post <IoIosCreate size={25}/></Link>
    </div>  */}
    {search}
    {createPostlable}

    {userRequest}

    {showmessages}
    <a className="navbar-brand" style={{cursor:"pointer"}} onClick={handleLogout}>
     Logout <BiLogOut />
    </a>
  </div>
</nav>
    </>
  )
}

export default Header