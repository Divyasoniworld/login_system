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
import Myprofile from './components/Myprofile';
import Messages from './components/Messages';
import Search from './components/Search';
import UserProfile from './components/Userprofile';
import Chatbox from './components/Chatbox';
import Email_verify from './components/Email_verifucation';


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
   <Route exact path="/home/profile" element={<Myprofile />} />
   <Route exact path="/findone/:id" element={<UserProfile />} />
   <Route exact path="/messages" element={<Messages />} />
   <Route exact path="/findone" element={<Search />} />
   <Route exact path="/chat/:id" element={<Chatbox />} />
   <Route exact path="/email_verify" element={<Email_verify />} />
</Routes>
  </BrowserRouter>
);

