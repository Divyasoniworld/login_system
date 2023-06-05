import React, { useEffect, useState } from 'react'
import '../css/request.css'
import Header from './Header'
import axios from 'axios';

function Request() {

    const token = localStorage.getItem('token');
    const follow_id = localStorage.getItem('UserId');

    const [requestData, setRequestData] = useState([])
    const [reqDelete, setReqDelete] = useState('')
    const [reqConfirm, setReqConfirm] = useState('')
    // const [requestData, setRequestData] = useState([])


    useEffect(() => {
      fetchAllRequest()
       
    }, [reqDelete,reqConfirm]);


    const handleConfirm = (r_user_id) => {
          axios.post('http://localhost:9595/api/v1/requestConfirm', {
            user_id: r_user_id
          }, 
          {
            headers: {
                'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
                'token': `${token}`, 
                'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            setReqConfirm(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });

    }

    const handleDelete  = (r_user_id) => {
        axios.post('http://localhost:9595/api/v1/requestDelete', {
          user_id: r_user_id
        }, 
        {
          headers: {
              'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
              'token': `${token}`, 
              'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          setReqDelete(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        });

  }

  const fetchAllRequest = () =>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:9595/api/v1/all_request`,
      headers: {
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=',
          'token': `${token}`,
          'Content-Type': 'application/json'
      },
      follow_id: follow_id
  };

  axios.request(config)
      .then((response) => {
          setRequestData(response.data.data)
      })
      .catch((error) => {
          console.log(error);
      });

  }

    return (
        <>
            <Header ReqCount = {requestData.length} />
            <div className='main-container'>
                {requestData.length > 0 ? requestData.map((rData, key) => {
                    return (
                        <div key={key} className='row'>
                            <div key={key} className='row'>
                                <div className='d-inline-flex align-items-center mt-3 gap-3'>
                                    <img src={rData.profile} width="60" height="60" className="d-inline-block align-text-top rounded-circle" alt='' />
                                    <div className='h5 text-black'>{rData.username}</div>
                                    <button type="button" className='p-1 btn btn-primary rounded' onClick={()=>{handleConfirm(rData.user_id)}} >Confirm</button>
                                    <button type="button" className='p-1 btn btn-secondary rounded' onClick={()=>{handleDelete(rData.user_id)}} >Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }) : 'No request found'}


            </div>
        </>
    )
}

export default Request