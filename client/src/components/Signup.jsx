import {useState} from 'react'
import "../css/signup.css"
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';

function Signup() {

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [first_name,setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [mobile,setMobile] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [Error,setError] = useState("");


    const handleSubmit = (e) =>{
      e.preventDefault()

      const formData = new FormData();
      formData.append('profile', selectedFile);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('mobile', mobile);
      formData.append('email', email);
      formData.append('password', password);
  
      axios.post('http://localhost:9595/api/v1/auth/signup', formData)
        .then((response) => {
          if (response.data.message) {
                setError(response.data.message)
              } else {
                console.log(formData);
                navigate('/login')
              }
        })
        .catch((error) => {
          console.error(error);
        });
    }


  return (
   <>

<div className="signup-form">
    <form encType= 'multipart/form-data' method="post">
		<h2>Sign Up</h2>
       <div className="form-group">
          <input type="file" accept='image/*' onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
       </div>
        <div className="form-group">
        	<input type="text" className="form-control" name="first_name" onChange={(e)=>{setFirst_name(e.target.value)}} placeholder="First Name" required="required" />
        </div>
        <div className="form-group">
        	<input type="text" className="form-control" name="last_name" onChange={(e)=>{setLast_name(e.target.value)}} placeholder="Last Name" required="required" />
        </div>
        <div className="form-group">
        	<input type="tel" className="form-control" name="mobile" onChange={(e)=>{setMobile(e.target.value)}} placeholder="Mobile" required="required" />
        </div>
        <div className="form-group">
        	<input type="email" className="form-control" name="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email " required="required" />
        </div>
		<div className="form-group">
            <input type="password" className="form-control" name="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required="required" />
        </div>      
        <div className="form-group">
			<label className="form-check-label"><input type="checkbox" required="required" /> I accept the <a href="/login">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div className="form-group">
            <button type="submit" onClick={handleSubmit}  className="btn btn-primary btn-lg">Sign Up</button>
        </div>
    </form>
	<div className="text-center">Already have an account? <Link to="/login">Login here</Link></div>
</div>

   </>
  )
}

export default Signup