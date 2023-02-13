import logo from './favicon.png';
import './App.css';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Profile from './components/Profile.js';


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
  
  const username = "John"
  const email = "johndoe@email.com"
  return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li className="navbar-header">
                  <Link to="/"><img src={ logo } width="50px" height="50px"/></Link>
                </li>
                <li className="navbar">
                  <Link to="/profile">{ username }</Link>
                </li>
                <li className="navbar">
                  <Link to="/profile">My List</Link>
                </li>
                <li className="navbar">
                  <Link to="/profile">Rentals</Link>
                </li>
              </ul>
            </nav>
            
            <Switch>
              <Route path="/profile">
                <Profile email={email} />
              </Route>
              <Route path="/profile">
                <Profile email={email} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
}

export default App;
