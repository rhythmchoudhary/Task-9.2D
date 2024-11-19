import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Home from './components/Home';
import Post from './components/Post';
import FindQuestions from './components/FindQuestion';
import PricingPlans from './components/PricingPlans';
import Payment from './components/Payment';


function App() {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/find-questions" element={<FindQuestions />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/pricing-plans" element={<PricingPlans />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>

  );
}

export default App;
