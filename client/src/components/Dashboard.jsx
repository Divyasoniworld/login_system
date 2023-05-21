import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/test.css'
import Header from './Header';


function Dashboard() {
  const [userData,setUserData] = useState([]);
  const [Delete,setDelete] = useState("");

  const params = useParams();
  console.log('param',params);

  
  const handeDelete = () =>{
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:9595/api/v1/auth/delete/3`,
      headers: { 
        'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
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
    
  }



useEffect(() => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:9595/api/v1/auth/alluser',
        headers: { 
          'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
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
}, []);



  return (
    <>
    <Header/>

<h2 className='mt-4 text-center text-dark'>Users Table</h2>
      <div className="container bootstrap snippets bootdey">
    <div className="row">
        <div className="col-lg-12">
            <div className="main-box no-header clearfix">
                <div className="main-box-body clearfix">
                    <div className="table-responsive">
                        <table className="table user-list">
                            <thead>
                                <tr>
                                <th><span>User</span></th>
                                <th><span>Name</span></th>
                                <th><span>Role</span></th>
                                <th><span>Created</span></th>
                                <th className="text-center"><span>Status</span></th>
                                <th><span>Email</span></th>
                                <th><span>Action</span></th>
                                <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            {userData.map((user,index)=>{
                              return(
                              <tr key={user.id}>
                                    <td>
                                        <img src={user.profile} alt=""/>
                                    </td>
                                    <td>
                                        {user.first_name}
                                    </td>
                                    <td>
                                        {user.role}
                                    </td>
                                    <td>{user.login_time}</td>
                                    <td className="text-center">
                                        <span className="label label-default">{user.login_status}</span>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td style={{width:"20%"}}>
                                        <a href="#" className="table-link text-info">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                        <a onClick={handeDelete} className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                              )
                            })}
                                {/* <tr>
                                    <td>
                                        <img src={location.state.profile} alt=""/>
                                        <a href="#" className="user-link">{location.state.first_name}</a>
                                        <span className="user-subhead">Member</span>
                                    </td>
                                    <td>2013/08/12</td>
                                    <td className="text-center">
                                        <span className="label label-default">pending</span>
                                    </td>
                                    <td>
                                        <a href="#">marlon@brando.com</a>
                                    </td>
                                    <td style={{width:"20%"}}>
                                        <a href="#" className="table-link text-info">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                        <a href="#" className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
     </div>

    </>
  );
}

export default Dashboard;
