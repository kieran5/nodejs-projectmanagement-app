import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Login from './Login';
import Projects from './Projects';
import Register from './Register';
import AddProject from './AddProject';
import ProjectDetail from './ProjectDetail';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.state = {
      isLoggedIn: false
    }
  }

  /*componentDidMount() {
    fetch('/login')
      .then(req)
  }*/

  handleLoginClick() {
    this.setState({isLoggedIn:true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn:false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    //const isLoggedIn = false;
    //alert(sessionStorage.getItem('username'));
    //alert(this.props);
    //console.log(this.props);
    //console.log(sessionStorage);

    let linkToRender = null;
    if(isLoggedIn) {
      linkToRender =
      (<li className="nav-item">
        <NavLink to="/logout" activeClassName="activeNav" className="nav-link">Logout</NavLink>
      </li>)
    } else {
      linkToRender =
      (<li className="nav-item">
        <NavLink to="/login" activeClassName="activeNav" className="nav-link">Login</NavLink>
      </li>
      )

    }

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

                {linkToRender}

                <li className="nav-item">
                  <NavLink to="/register" activeClassName="activeNav" className="nav-link">Register</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/addProject" activeClassName="activeNav" className="nav-link">Add New Project</NavLink>
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
          <Route path="/addProject" component={AddProject} />
          <Route path="/projects/" component={ProjectDetail} />

        </div>
      </Router>
    );
  }
}

export default App;
