import React, { Component } from 'react';
import '../styles/Projects.css';

class Projects extends Component {
  //
  constructor() {
    super();

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    fetch('/projects')
      .then(res => res.json())
      .then(projects => this.setState({ projects },
      () => console.log('Projects fetched: ', projects)));
  }


  render() {
    return (
      <div>
        <h2>Projects</h2>
        <ul>
          {this.state.projects.map(project =>
            <li key={project._id}><a href={"/projects/" + project._id} >{ project.name } - { project.location }</a></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Projects;
