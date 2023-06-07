import react,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/post.css'
import Header from './Header';
import Box from '@mui/material';
function Post() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description,setDescription] = useState('');
    const [Error,setError] = useState("");
    const navigate = useNavigate()
   const token = localStorage.getItem('token');

const handlesubmit = (e) => {
    e.preventDefault()

const FormData = require('form-data');
let data = new FormData();
data.append('image', selectedFile);
data.append('description', description);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:9595/api/v1/createpost',
  headers: { 
    'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
    'token': `${token}`, 
  },
  data : data
};

axios.request(config)
.then((response) => {
console.log('response' , response);
 navigate('/home/posts')
})
.catch((error) => {
  console.log(error);
});

   
  

}


  return (
    <>
    <Header/>
    <div className="main_container">
        <div className='text-dark h4'>Create Post</div>
        <form encType= 'multipart/form-data' method='post'>
            <input type='file' onChange={(e)=>{setSelectedFile(e.target.files[0])}} id='post' />
            <input type='text' name='description' onClick={(e)=>{setDescription(e.target.value)}} id='description' placeholder='say somthing...' />
            <button onClick={handlesubmit} className='ms-2' type='submit'>Post</button>
        </form>
    </div>
    </>
  )
}

export default Post