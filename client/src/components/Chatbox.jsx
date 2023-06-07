import React from 'react'
import '../css/chatbox.css'

function Chatbox() {
  return (
    <>
       <div className='container w-100 border'>
       <div className='row' style={{width : "inherit"}}>
       <div className='col-md-12 d-flex align-items-center gap-3 m-3 border'>
        <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80' style={{width : "80px"}} className='rounded-circle' alt='' />
        <h4>Firstname Lastname</h4>
        </div>
       </div>

       <div className='row border m-1' style={{width : "inherit"}}>
       <div className='col-md-6 d-flex align-items-center justify-content-left'>
       <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80' style={{width : "80px",height: "80px"}} className='rounded-circle' alt='' />
        <h4>Firstname Lastname</h4>
        </div>
       </div>

       
       </div>
    </>
  )
}

export default Chatbox