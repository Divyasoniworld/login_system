import react,{useState,useEffect} from 'react'
import Header from './Header'
import '../css/home.css'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt ,AiFillHeart} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios'






function Home() {

    var follow = `Follow +`;

    const handlefollow = (postId) => {
        alert(`follow postId : ${postId}`)
    }

    const params = useParams();
    // console.log("param",params)

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

    // likeData[0].is_like == 1 && likeData[0].user_id == UserId

    var alllikedata = [];

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
                            <div className="card-header d-flex ustify-content-center">
                            <img src= {post.profile} alt='' width="50" height="50" className="d-inline-block align-text-top rounded-circle"/>
                               <h5 className='ms-2'> {post.username}</h5>
                               <button className='mx-2 px-2' style={{width:"auto",height : "30px"}} onClick={()=>{handlefollow(post.id)}}>{follow}</button>
                                
                            </div>
                            <div className="card-body">
                                <img style={{width:'50%'}} src={post.image} alt='' />
                            </div>
                            <div className="card-footer ">
                            
                            {(post.likes > 0) ? post.likes : ""} {(post.post_like == 1) ? <AiFillHeart style={{color:"red",cursor:"pointer"}}  onClick={() => {handleLike(post.id)}} size={35} /> : <AiOutlineHeart style={{cursor : "pointer"}} onClick={() => {handleLike(post.id)}} size={35} />}
                            {/* <AiOutlineHeart values={post.id} onClick={(e) => handleLike(e.target)} size={30} /> */}
                                {/* <AiFillHeart style={{color : "red"}} size={30} /> */}
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