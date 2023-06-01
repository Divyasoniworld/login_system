import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Multer from './components/Multer';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';
import Post from './components/Post';
import Request from './components/Request';
import UserProfile from './components/UserProfile';
import Messages from './components/Messages';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
   <Route exact path="/upload" element={<Multer />} />
   <Route exact path="/dashboard" element={<Dashboard />} />
   <Route exact path="/" element={<Signup />} />
   <Route exact path="/login" element={<Login />} />
   <Route exact path="/home/posts" element={<Home />} />
   <Route exact path="/header" element={<Header />} />
   <Route exact path="/post" element={<Post />} />
   <Route exact path="/home/request" element={<Request />} />
   <Route exact path="/home/profile" element={<UserProfile />} />
   <Route exact path="/messages" element={<Messages />} />
</Routes>
  </BrowserRouter>
);

