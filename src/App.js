import logo from './images/white-logo.png';
import './App.css';
import React, { useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Profile from './components/Profile.js';
import Conversations from './components/Conversations.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import AccountMenu from './components/AccountMenu.js';
import Dashboard from './components/Dashboard';
import Listings from './components/Listings.js';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
                <li className="navbar-right">
                  <MdMenu size={26}/>
                </li>
                <li className="navbar">
                  <AccountMenu authenticated={authenticated}/>
                </li>
              </ul>
            </nav>
            
            <Routes>
              <Route exact path="/profile" element={<Profile email={email} firstName={firstName} lastName={lastName} />}>
              </Route>
              <Route exact path="/conversations" element={<Conversations email={email}/>}>
              </Route>
              <Route exact path="/login" element={<Login authenticated={authenticated}/>}>
              </Route>
              <Route exact path="/account" element={<Listings />}>
              </Route>
            </Routes>
          </div>
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
              <Route path="/profile" element={<Profile email={email} firstName={firstName} lastName={lastName} />}>
              </Route>
              <Route path="/conversations" element={<Conversations email={email} />}>
              </Route>
              <Route exact path="/login" element={<Login authenticated={authenticated} />}>
              </Route>
              <Route path="/register" element={<Register />}>
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    );
}

export default App;
