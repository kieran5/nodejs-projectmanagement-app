import React, { Component } from 'react';

class AddProject extends Component {

  constructor() {
    super();

    this.state = {
      contributors: [],
      resources: []
    }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(contributors => this.setState({ contributors }));

    fetch('/resources/available')
      .then(res => res.json())
      .then(resources => this.setState({ resources }));
  }

  render() {
    return (
      <div class="form-group">
        <h2>Add Project</h2>

        <form action="/projects" method="post" encType="application/x-www-form-urlencoded">
          <label id="lblName">Project Name</label>
          <input type="text" name="name" id="name" class="form-control" />

          <label id="lblName">Start Date</label>
          <input type="date" name="startDate" id="startDate" class="form-control" />

          <label id="lblName">End Date</label>
          <input type="date" name="endDate" id="endDate" class="form-control" />

          <label id="lblName">Contributors</label>
          <select multiple name="contributors" class="form-control">
            {this.state.contributors.map(contributor =>
              <option key={contributor.username} value={contributor._id}>{ contributor.username }</option>
            )}
          </select>

          <label id="lblName">Resources</label>
          <select multiple name="resources" class="form-control">
            {this.state.resources.map(resource =>
              <option key={resource.username} value={resource._id}>{ resource.name }</option>
            )}
          </select>

          <label id="lblName">Location</label>
          <input type="text" name="location" id="location" class="form-control" />

          <label id="lblName">Total Steps in Project</label>
          <input type="number" name="totalSteps" id="totalSteps" class="form-control" />

          <input type="hidden" name="creator" id="creator" value={sessionStorage.getItem("userData")} />

          <input type="submit" value="Add" class="form-control"></input>
        </form>
      </div>
    );
  }
}

export default AddProject;
