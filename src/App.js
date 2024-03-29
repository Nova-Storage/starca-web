import logo from './images/white-logo.png';
import './App.css';
import React, { useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Profile from './components/Profile.js';
import Conversations from './components/Conversations.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import AccountMenu from './components/AccountMenu.js';
import Dashboard from './components/Dashboard';
import Listings from './components/Listings.js';
import ListingDetail from './components/ListingDetail.js';
import Footer from './components/Footer.js';
import CreateListing from './components/CreateListing.js';
import MyListings from './components/MyListings.js';
import Message from './components/Message.js';
import ListingRequests from './components/ListingRequests.js';
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword';
import Account from './components/Account';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  console.log("State isLoggedIn: " + isLoggedIn);
  //let location = useLocation();
  
  function authenticated(){
    setIsLoggedIn(!isLoggedIn);
  }
    
  const firstName = "John"
  const lastName = "Doe"
  const email = "johndoe@email.com"
  
  if (isLoggedIn) {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul className="navbar-ul">
                <li className="navbar-header">
                  <Link to="/"><img src={ logo } width="160px" max_height="auto"/></Link>
                </li>
                {/* <li className="navbar-right">
                  <MdMenu size={26}/>
                </li> */}
                <li className="navbar" style={{marginRight: '1%'}}>
                  <AccountMenu authenticated={authenticated}/>
                </li>
              </ul>
            </nav>
 
            <Routes>
              <Route exact path="/" element={<Dashboard />}>
              </Route>
              <Route exact path="/profile" element={<Profile email={email} firstName={firstName} lastName={lastName} />}>
              </Route>
              <Route exact path="/conversations" element={<Conversations email={email}/>}>
              </Route>
              <Route exact path="/login" element={<Login authenticated={authenticated}/>}>
              </Route>
              <Route exact path="/account" element={<Account />}>
              </Route>
              <Route exact path="/create-listing" element={<CreateListing />}>
              </Route>
              <Route exact path="/detail" element={<ListingDetail />}>
              </Route>
              <Route exact path="/my-listings" element={<MyListings />}>
              </Route>
              <Route exact path="/requests" element={<ListingRequests />}>
              </Route>
              <Route exact path="/messages" element={<Message />}>
              </Route>
            </Routes>
          </div>
          {console.log(window.location.pathname === '/')}
          { window.location.pathname === '/' ? <Footer /> : <div></div> }
        </Router>
      </div>
      );
  }
  
  return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul className="navbar-ul">
                <li className="navbar-header">
                  <Link to="/"><img src={ logo } width="160px" max_height="auto"/></Link>
                </li>
                <li className="navbar-right">
                  <Link to="/login">Sign in</Link>
                </li>
              </ul>
            </nav>
            
            <Routes>
              <Route exact path="/" element={<Dashboard />}>
              </Route>
              <Route path="/profile" element={<Profile email={email} firstName={firstName} lastName={lastName} />}>
              </Route>
              <Route path="/conversations" element={<Conversations email={email} />}>
              </Route>
              <Route exact path="/login" element={<Login authenticated={authenticated} />}>
              </Route>
              <Route exact path="/register" element={<Register />}>
              </Route>
              <Route exact path="/forgotPassword" element={<ForgotPassword />}>
              </Route>
              <Route exact path="/resetPassword" element={<ResetPassword />}>
              </Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      </div>
    );
}

export default App;
