import {useState} from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [Error,setError] = useState("");
  const navigate = useNavigate();
 

const handleLogin = (e) =>{
  e.preventDefault()
  let data = JSON.stringify({
    email: email,
    password: password,
    device_type: 'A',
    device_token: 0
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:9595/api/v1/auth/login',
    headers: { 
      'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
   if(response.data.code == 0){
     setError(response.data.massage)
   }else{
    var token = response.data.data.token
    var id = response.data.data.id
    localStorage.setItem('token',token);
    localStorage.setItem('UserId',id);
    
    var gettoken = localStorage.getItem('token');
    console.log(gettoken);
    if (!gettoken) {
      setError('User Data not found')
    } else if(response.data.data.role == 'user'){
      console.log(response.data.data);
      navigate('/home/posts',{state : response.data.data} )
    }else{
      navigate('/dashboard',{state : response.data.data} )
    }

   }
   
  })
  .catch((error) => {
    console.log(error);
  });
}

if (Error.length > 0) {
  var allerr = <div class="alert alert-danger col-sm-12">{Error}</div>
} 


  return (
    <>
<div className="signup-form">
    <form  method="post">
		<h2>Login</h2>
        <div className="form-group">
        	<input type="email" className="form-control" name="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address" required="required" />
        </div>
		<div className="form-group">
            <input type="password" className="form-control" name="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required="required" />
        </div>
		<div className="form-group">
            <button type="submit" onClick={handleLogin} className="btn btn-primary btn-lg">Login</button>
        </div>
    </form>
    {allerr}
	<div className="text-center">Don't have an account? <Link to="/">Create An Account</Link></div>
</div>

    </>
  )
}

export default Login