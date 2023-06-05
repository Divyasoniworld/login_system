import React, { useState, useEffect } from 'react'
import Header from './Header'
import '../css/userprofile.css'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
import {BsPersonFillLock} from 'react-icons/bs'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function UserProfile() {

  const params = useParams()
  const token = localStorage.getItem('token')
  const follow_id = localStorage.getItem('UserId')
  const [posts, setPosts] = useState([]);
  const [likeData, setLikeData] = useState([])
  const [reqData, setReqData] = useState({})
  const [refresh, setRefresh] = useState()
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [postcount, setPostCount] = useState(0);
  const [userData, setUserData] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchsingleUser() 
    fetchpostcount() 
    fetchPosts();
    fetchReqdata()
    fetchFollowers();
    fetchFollowing();
    fetchsingleUser();
  }, [refresh]);

  const sendRequest = () => {
    axios.post('http://localhost:9595/api/v1/follow_request', {
      follow_id: params.id
    },
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchReqdata = () => {
    axios.get(`http://localhost:9595/api/v1/getreqdata`,
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json',
          'user_id' : `${params.id}`
        }
      },
     )
      .then((response) => {
        setReqData(response.data.data)
        console.log("reqData",response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPosts = () => {
    axios.get(`http://localhost:9595/api/v1/uservisepost/${params.id}`,
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {

        if (response.data.data.result[0].is_private == 0) {
          setPosts(response.data.data.result)
        } else {
          if (response.data.data.request == 0) {
            setMessage(<div className='d-flex justify-content-left place-item-center mt-4'><BsPersonFillLock size={35}/><h3>This Account is Private</h3></div>)
          } else {
            if (response.data.data.result[0].is_private == 1 && response.data.data.request.status == 'Pending') {
              setMessage(<div className='d-flex justify-content-left place-item-center mt-4'><BsPersonFillLock size={35}/><h3>This Account is Private</h3></div>)
            setPosts([])
            } else {
              setPosts(response.data.data.result)
            }
          }
        }

       
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFollowers = () => {
    axios.post('http://localhost:9595/api/v1/auth/followers', {
      follow_id: params.id
    },
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data.data);
        setFollowers(response.data.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchpostcount = () => {
    axios.post('http://localhost:9595/api/v1/auth/postcount', {
      follow_id: params.id
    },
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setPostCount(response.data.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchsingleUser = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:9595/api/v1/auth/searchuser/${params.id}`,
      headers: {
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
        'token': `${token}`,
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
  };

  const fetchFollowing = () => {
    axios.post('http://localhost:9595/api/v1/auth/following', {
      user_id: params.id
    },
      {
        headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setFollowing(response.data.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLike = (id) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:9595/api/v1/userpostlike`,
      headers: {
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
        'token': `${token}`,
        'Content-Type': 'application/json',
        'id': `${id}`,
        'user_id': `${params.id}`
      },
    };

    axios.request(config)
      .then((response) => {
        setLikeData(response.data.data[0])

        setRefresh(!refresh)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  var verified;

  if (userData.is_verified == 1) {
    verified = <VscVerifiedFilled style={{ marginTop: '2px' }} size={20} color='#0095F6' />
  } else {
    verified = ''
  }

 

  return (
    <>
      <Header />


      <div class="container">
        <div class="profile-env">
          <header class="row">
            <div class="col-sm-2">
              <a href="#" class="profile-picture">
                <img src={userData.profile} className="rounded" style={{ width: '50%', float: 'left' }} /> </a>
            </div>
            <div class="col-sm-7 w-100">
              <ul class="profile-info-sections">
                <li>
                  <div className="d-inline-flex place-item-center gap-1">
                    <div className='text-black'>{userData.first_name} {userData.last_name}</div>
                    {verified}
                  </div>
                </li>
                <li>
                  <div class="d-flex gap-2">
                    <h3 className='text-black h5'>{postcount.post_count}</h3>
                    <div className='text-black'>Posts</div>
                  </div>
                </li>
                <li>
                  <div class="d-flex gap-2">
                    <h3 className='text-black h5'>{followers.followers}</h3>
                    <div className='text-black'>Followers</div>
                  </div>
                </li>
                <li>
                  <div class="d-flex gap-2">
                    <h3 className='text-black h5'>{following.following}</h3>
                    <div className='text-black'>Following</div>
                  </div>
                </li>
                <li>
                  {reqData.length > 0 ? reqData.map((r,index) => {
                    return (
                      <div key={index} class="d-flex gap-2">
                        <button id='follow' className='btn btn-secondary' onClick={sendRequest}>{r.status == 'Pending' ? 'Requested' : 'Following'}</button>
                      </div>
                    )
                  }) : <button id='follow' className='btn btn-secondary' onClick={sendRequest}>Follow</button>}

                </li>
              </ul>
            </div>
          </header>
        </div>
        <hr></hr>
        <div className="row">

          {posts.length > 0 ? posts.map((post,key) => {
            return (
              <div key={key} className="col-md-3 mt-4">
                <img src={post.image} alt='' width={'60%'} height={'90%'} />
                <div className="footer">
                  {(post.likes > 0) ? post.likes : ""} {(post.post_like == 1) ? <AiFillHeart style={{ color: "red", cursor: "pointer" }} onClick={() => { handleLike(post.id) }} size={35} /> : <AiOutlineHeart style={{ cursor: "pointer" }} onClick={() => { handleLike(post.id) }} size={35} />}
                  <AiOutlineComment size={30} />
                  <AiOutlineShareAlt size={30} />
                </div>
              </div>
            )
          }) : message }
        </div>
      </div>


    </>
  )
}

export default UserProfile