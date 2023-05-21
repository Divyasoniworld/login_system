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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
   <Route exact path="/upload" element={<Multer />} />
   <Route exact path="/dashboard" element={<Dashboard />} />
   <Route exact path="/" element={<Signup />} />
   <Route exact path="/login" element={<Login />} />
   <Route exact path="/home" element={<Home />} />
   <Route exact path="/header" element={<Header />} />
   <Route exact path="/post" element={<Post />} />
</Routes>
  </BrowserRouter>
);

