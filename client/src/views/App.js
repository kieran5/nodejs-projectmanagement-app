import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Login from './Login';
import Projects from './Projects';
import Register from './Register';
import AddProject from './AddProject';
import ProjectDetail from './ProjectDetail';
import EditProject from './EditProject';
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
      user: {},
      isLoggedIn: false,
      searchQuery: "",
      searchResults: []
    }
  }

  change = (e) => {
    this.setState({
      searchText: e.target.value
    });
  }

  getSearchResults() {

  }

  componentDidMount() {
    //console.log("fetch");
    /*fetch('/currentUser')
      .then(res => res.json())
      .then(user => this.setState({ user },
      () => console.log('User fetched: ', user)));*/


  }

  handleLoginClick() {
    this.setState({isLoggedIn:true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn:false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    //const isLoggedIn = true;
    //alert(sessionStorage.getItem('username'));
    //alert(this.props);
    //console.log(this.props);
    //console.log(sessionStorage);

    //console.log(this.state.user.userID);
    //console.log(this.props.user);

    //console.log(sessionStorage);


    let linkToRender = null;
    if(isLoggedIn) {
      linkToRender =
      (
        <li className="nav-item">
          <NavLink to="/logout" activeClassName="activeNav" className="nav-link">Logout</NavLink>
        </li>
      )
    } else {
      linkToRender =
      (
        <div>
          <li className="nav-item">
            <NavLink to="/login" activeClassName="activeNav" className="nav-link">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" activeClassName="activeNav" className="nav-link">Register</NavLink>
          </li>
        </div>
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
                  <NavLink to="/addProject" activeClassName="activeNav" className="nav-link">Add New Project</NavLink>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.searchQuery}
                  onChange={e => this.change(e)}
                >
                </input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>

          <Route exact path="/" component={Projects} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/addProject" component={AddProject} />
          <Route path="/projects/" component={ProjectDetail} />
          <Route path="/projectsEdit/" component={EditProject} />

        </div>
      </Router>
    );
  }
}

export default App;
