import React, { useEffect, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {

    const token = localStorage.getItem('token');
     const follow_id = localStorage.getItem('UserId');

    const [searchData,setSearchData] = useState([])
    const [searchKeyword,setSearchKeyword] = useState({})

    useEffect(()=>{
        handleSearch()
    },[])

    const handleSearch = () =>{

        axios.post('http://localhost:9595/api/v1/findone', {
            search: searchKeyword
          }, 
          {
            headers: {
                'api-key': 'XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=XnOBHi0M9hkUAI2RWa7J6zZn5NsEm1ofrZy5uVybFTw=', 
                'token': `${token}`, 
                'Content-Type': 'application/json'
            }
          })
          .then((response) => {
              if (searchKeyword == "") {
                setSearchData([])
                } else{
                    setSearchData(response.data.data)
                    setSearchKeyword('')
                }
            // setSearchKeyword(!searchKeyword)
          })
          .catch((error) => {
            console.log(error);
          });

    }



  return (
    <>
        <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center">
                                    <div class="col">
                                        <input class="form-control form-control-lg form-control-borderless" type="search" onChange={(e)=>{setSearchKeyword(e.target.value)}} placeholder="Search topics or keywords" onKeyUp={handleSearch} />
                                    </div>
                                    <div class="col-auto">
                                    <AiOutlineSearch size={30}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-12 col-md-10 col-lg-8 d-grid justify-content-center mt-3'>
                        { searchData.length > 0 ? searchData.map((e,index)=>{
                            return(
                                <Link key={index} to={`/findone/${e.id}`} className='d-flex gap-4 place-items-center mb-3'>
                                <img src={e.profile} width="60" height="60" className="d-inline-block align-text-top rounded-circle" alt='' />
                               <h3  className='text-dark mt-2'>{e.username}</h3>
                            </Link>
                            )
                        }) : ''}
                        </div>
                    </div>
    </>
  )
}

export default Search