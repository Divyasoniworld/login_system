import {useState} from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
function Email_verify() {


  const handleVerify = (e) => {
    e.preventDefault()
    axios.post('http://localhost:9595/api/v1/verify', 
    {
      headers : {
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
        'token': `${token}`
      }
    }
    )
      .then((response) => {
        if (response.data.data) {
          navigate('/home/posts')
        } 
      })
      .catch((error) => {
        console.error(error);
      });
    
  }


 

  return (
    <>
<div className="signup-form">
    <form  method="post">
		<h2>Email Verification</h2>
        <div className="form-group">
        	<input type="text" className="form-control" name="code" placeholder="Enter OTP code" required="required" />
        </div>
		<div className="form-group d-flex justify-content-between">
            <button type="submit" className="btn btn-primary btn-lg" onClick={handleVerify}>Verify</button>
            <button type="button" className="btn btn-primary btn-lg">Resend</button>
        </div>
    </form>
</div>

    </>
  )
}

export default Email_verify