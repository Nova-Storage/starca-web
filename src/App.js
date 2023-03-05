import logo from './images/white-logo.png';
import './App.css';
import { CgProfile } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Profile from './components/Profile.js';
import Conversations from './components/Conversations.js';
import Login from './components/Login.js';
import SearchResults from './components/SearchResults';

function App() {
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  
  function displayMenu(){
        //setEditBio(true);
        //TODO
    }
  
  const firstName = "John"
  const lastName = "Doe"
  const email = "johndoe@email.com"
  return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li className="navbar-header">
                  <Link to="/"><img src={ logo } width="160px" max_height="auto"/></Link>
                </li>
                <li className="navbar-right">
                  <MdMenu onClick={ displayMenu } size={22} />
                </li>
                <li className="navbar">
                  <Link to="/login">Login</Link>
                </li>
                <li className="navbar-icons">
                  <CgProfile onClick={ displayMenu } size={22}/>
                </li>
                <li className="navbar">
                  <Link to="/profile">{ firstName }</Link>
                </li>
                <li classname="navbar">
                  <Link to="/SearchResults">Search Results</Link>
                </li>
                <li className="navbar">
                  <Link to="/conversations">Messages</Link>
                </li>
              </ul>
            </nav>
            
            <Switch>
              <Route path="/profile">
                <Profile email={email} firstName={firstName} lastName={lastName} />
              </Route>
              <Route path="/conversations">
                <Conversations email={email} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/SearchResults">
                <SearchResults />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
}

export default App;
