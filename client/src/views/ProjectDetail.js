import React, { Component } from 'react';

class ProjectDetail extends Component {
  //
  constructor() {
    super();

    this.state = {
      project: {}
    }
  }

  componentDidMount() {
    fetch('/projects/' + this.props.location.pathname.substring(10))
      .then(res => res.json())
      .then(project => this.setState({ project },
      () => console.log('Project fetched: ', project)));
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

        

      </div>
    );
  }
}

export default ProjectDetail;
