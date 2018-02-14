import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Login from './Login';
import Projects from './Projects';
import Register from './Register';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand">Project Hub</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink to="/" exact activeClassName="activeNav" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" activeClassName="activeNav" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" activeClassName="activeNav" className="nav-link">Register</NavLink>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>

          <Route exact path="/" component={Projects} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

        </div>
      </Router>
    );
  }
}

export default App;
