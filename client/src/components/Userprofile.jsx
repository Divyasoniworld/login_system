import React, { useState, useEffect } from 'react'
import Header from './Header'
import '../css/userprofile.css'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
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
  const [userData, setUserData] = useState({})

  useEffect(() => {
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
        setPosts(response.data.data)
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
        setFollowers(response.data.data[0])
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

  // var follow = document.getElementById('follow').innerText
  // const handleFollow = () => {



  //  document.getElementById('follow').innerText = 'Following'
  // }



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
                    <h3 className='text-black h5'>{posts.length}</h3>
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
          {posts.length > 0 ? posts.map((post) => {
            return (
              <div className="col-md-3 mt-4">
                <img src={post.image} alt='' width={'60%'} height={'90%'} />
                <div className="footer">
                  {(post.likes > 0) ? post.likes : ""} {(post.post_like == 1) ? <AiFillHeart style={{ color: "red", cursor: "pointer" }} onClick={() => { handleLike(post.id) }} size={35} /> : <AiOutlineHeart style={{ cursor: "pointer" }} onClick={() => { handleLike(post.id) }} size={35} />}
                  <AiOutlineComment size={30} />
                  <AiOutlineShareAlt size={30} />
                </div>
              </div>
            )
          }) : 'No posts found'}
        </div>
      </div>


    </>
  )
}

export default UserProfile