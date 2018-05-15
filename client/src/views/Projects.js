import React, { Component } from 'react';
import '../styles/Projects.css';

class Projects extends Component {
  //
  constructor() {
    super();

    this.checkProjectCreatorsAgainstUsers = this.checkProjectCreatorsAgainstUsers.bind(this);

    this.state = {
      projects: [],
      users: []
    }
  }

  componentDidMount() {
    fetch('/projects')
      .then(res => res.json())
      .then(projects => this.setState({ projects },
      () => console.log('Projects fetched: ', projects)));

    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users },
      () => console.log('Users fetched: ', users)))


  }

  checkProjectCreatorsAgainstUsers(project) {
    for(var i = 0; i < this.state.users.length; i++) {
      if(project.creator == this.state.users[i]._id) {
        project.creator = this.state.users[i].username;
      }
    }

    return
  }


  render() {
    return (
      <div class="list-wrapper">
        <h2 class="list-title">Projects</h2>
        <ul class="list-group list-group-flush">
          {this.state.projects.map(project =>
            <li key={project.id} class="removeListStyle"><a class="list-group-item list-group-item-action alignLeft" href={"/projects/" + project._id} >{ project.name }<p class="alignRight">{ project.location } / { this.checkProjectCreatorsAgainstUsers(project) } { project.creator }</p></a></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Projects;
