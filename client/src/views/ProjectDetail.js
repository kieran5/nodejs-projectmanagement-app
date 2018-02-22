import React, { Component } from 'react';

class ProjectDetail extends Component {
  //
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);

    this.state = {
      project: {},
      user: {}
    }
  }

  onDelete = () => {
    console.log("onDelete called.");
    return fetch('/projectSoftDelete/' + this.props.location.pathname.substring(10), {
      method: 'put'
    })
    .then(res => res.json());
  }

  nextStep = () => {
    console.log("nextStep function called.");
    return fetch('/projectNextStep/' + this.props.location.pathname.substring(10), {
      method: 'put'
    });
  };

  componentDidMount() {
    fetch('/projects/' + this.props.location.pathname.substring(10))
      .then(res => res.json())
      .then(project => this.setState({ project },
      () => console.log('Project fetched: ', project)));

    fetch('/currentUser')
      .then(res => res.json())
      .then(user => this.setState({ user },
      () => console.log('User fetched: ', user)));
  }


  render() {
    return (
      <div>
        <h2>Project Detail</h2>

        <h3>{ this.state.project.name } - { this.state.project.location }</h3>

        <h5>Created by { this.state.project.creator }.</h5>

        { this.state.project.startDate }

        { this.state.project.endDate }

        { this.state.project.contributors }

        { this.state.project.resources }

        Step { this.state.project.progressStep } out of { this.state.project.totalSteps } complete.

        <br></br>
        <button onClick={this.onDelete}>Delete Project</button>

        <br></br>
        { this.state.user.username }

        <br></br>
        <button onClick={this.nextStep}>Progress Project to Next Step</button>



      </div>
    );
  }
}

export default ProjectDetail;
