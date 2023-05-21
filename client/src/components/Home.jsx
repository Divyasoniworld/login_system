import react,{useState,useEffect} from 'react'
import Header from './Header'
import '../css/home.css'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt ,AiOutlineCamera} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import axios from 'axios'






function Home() {

    // const [userData, setUserData] = useState({})
    const [postData,setPostData] = useState([])
   const token = localStorage.getItem('token');

    useEffect(() => {
        console.log(postData);
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
    //    console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
   
    return (
        <>
            <Header />


            <div className="container text-center mt-4">
                <div className="row">
                    <div className="col-md-4 h-100">
                    </div>


                    <div className="col-md-8 h-100">
                        {postData.map((post,index)=>{
                            return(
                            <div key={index} className="card mb-4">
                            <div className="card-header">
                            <img src= {post.profile} alt='' width="60" height="60" className="d-inline-block align-text-top rounded-circle"/>
                                {post.first_name} {post.last_name}
                                
                            </div>
                            <div className="card-body">
                                <img style={{width:'100%'}} src={post.image} alt='' />
                            </div>
                            <div className="card-footer ">
                                <AiOutlineHeart size={30} />
                                <AiOutlineComment size={30} />
                                <AiOutlineShareAlt size={30} />
                            </div>
                            {post.post_created_at}
                        </div>
                            )
                        })}
                        
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home