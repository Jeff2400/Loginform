import React from 'react';
import Footer from '../common/Footer';
import Homepage from '../Home/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../common/Header';
import LoginForm from './LoginForm';
import RegisterForm from './registerForm';

const Pages = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route  path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/register" element={<RegisterForm />}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default Pages;
