import React, { useEffect, useState } from 'react'
import '../css/messages.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Header from './Header'

function Messages() {

	var token = localStorage.getItem('token');
	const [chatInbox, setChatInbox] = useState([])

	useEffect(()=>{
		fetchchatInbox()
	},[])

	const fetchchatInbox = () => {
      axios.get('http://localhost:9595/api/v1/chat_inbox',
	 {
		headers : {
			"api-key" : "XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=",
			"token" : `${token}`
		}
	 } 
	  ).then((response)=>{
		console.log(response.data.data);
		setChatInbox(response.data.data)
	  }).catch((error)=>{
		console.log(error);
	  })
	}



  return (
    <>
	<Header/>

	<div className='row'>
    <div class="col-md-4">
	</div>
	<div class="col-md-4">
       {chatInbox.length > 0 ? chatInbox.map((e,key)=>{
		return(
			<div key={key} className='row'>
				<div className='d-flex justify align-items-center mt-3 gap-3'>
					<img src={e.profile} width="60" height="60" className="d-inline-block align-text-top rounded-circle" alt='' />
					<Link to={`/chat/${e.message_id}`} className='text-decoration-none'> <div className='h5 text-black'>{e.first_name} {e.last_name}</div> </Link>
					<div className='text'>{e.updated_at}</div>
				</div>
			</div>
		)
	   }) : "Not Data Found"}
	   </div>
	   <div class="col-md-4">
	</div>
	</div>
    </>
  )
}

export default Messages