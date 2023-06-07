import react,{useState,useEffect} from 'react'
import Header from './Header'
import '../css/home.css'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt ,AiFillHeart} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios'


function Home() {

 
    const params = useParams();

    var UserId = localStorage.getItem('UserId')

    const [postData,setPostData] = useState([]) 
    const [refresh, setRefresh] = useState()
    const [likeData,setLikeData] = useState([]) 
    const [unLike,setUn] = useState("") 
   const token = localStorage.getItem('token');

   const fetchpost = () =>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:9595/api/v1/allposts',
        headers: { 
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token' : `${token}`, 
          'Content-Type': 'application/json'
        }
      };
      
  axios.request(config)
  .then((response) => {
  setPostData(response.data.data)
//   console.log(response.data.data)
  })
  .catch((error) => {
    console.log(error);
  });
   }

    useEffect(() => {
        console.log(likeData);
        fetchpost()
    }, [refresh]);

const handleLike = (id) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:9595/api/v1/postlike`,
            headers: { 
              'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
              'token' : `${token}`, 
              'Content-Type': 'application/json',
              'id' : `${id}`
            },
          };
          
      axios.request(config)
      .then((response) => {
        // alllikedata.push()
    setLikeData(response.data.data[0])
      
    setRefresh(!refresh)
    // window.location.reload();
    // window.NavigationPreloadManager()
      })
      .catch((error) => {
        console.log(error);
      });
}   
   
    return (
        <>
            <Header />


            <div className="container text-center mt-4">
                <div className="row">

                <div className='col-md-4 h-100'>

                </div>
                
                    <div className="col-md-6 h-100">
                        {postData.map((post,index)=>{
                            return(
                            <div key={index} className="card mb-4">
                            <input type='hidden' value={post.id} />
                           <div className="card-header d-flex place-item-center">
                            <img src= {post.profile} alt='' width="50" height="50" className="d-inline-block align-text-top rounded-circle"/>
                            <Link to={`/findone/${post.user_id}`} className='text-decoration-none'> <h5 className='ms-2 mt-2 text-black '> {post.username}</h5></Link>
                            </div> 
                            <div className="card-body">
                                <img style={{width:'50%'}} src={post.image} alt='' />
                                <div className='description'>{post.description}</div>
                            </div>
                            <div className="card-footer ">
                            
                            {(post.like_count > 0) ? post.like_count : ""} {(post.post_like.length > 0) ? <AiFillHeart style={{color:"red",cursor:"pointer"}}  onClick={() => {handleLike(post.id)}} size={35} /> : <AiOutlineHeart style={{cursor : "pointer"}} onClick={() => {handleLike(post.id)}} size={35} />}
                             <AiOutlineComment size={30} />
                                <AiOutlineShareAlt size={30} />
                            </div>
                            {post.post_created_at}
                        </div>
                            )
                        })}
                        
                    </div>

                    <div className='col-md-3 h-100'>
                    
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home