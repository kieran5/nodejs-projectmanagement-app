import React, { Component } from 'react';
import { TextField, DatePicker, SelectField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";

class EditProject extends Component {

  constructor() {
    super();

    this.state = {
      project: {},
      contributors: [],
      resources: []
    }
  }

  componentDidMount() {
    fetch('/projects/' + this.props.location.pathname.substring(14))
      .then(res => res.json())
      .then(project => this.setState({ project },
      () => console.log('Project fetched: ', project)));

    fetch('/users')
      .then(res => res.json())
      .then(contributors => this.setState({ contributors }));

    fetch('/resource/available')
      .then(res => res.json())
      .then(resources => this.setState({ resources }));
  }

  render() {
    return (
      /*<div class="form-group">
        <h2>Edit</h2>

        <form action="/projects" method="post" encType="application/x-www-form-urlencoded">
          <label id="lblName">Project Name</label>
          <input type="text" name="name" id="name" class="form-control" value={ this.state.project.name } />

          <label id="lblName">Start Date</label>
          <input type="date" name="startDate" id="startDate" class="form-control" value={ this.state.project.startDate }/>

          <label id="lblName">End Date</label>
          <input type="date" name="endDate" id="endDate" class="form-control" value={ this.state.project.endDate } />

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
          <input type="text" name="location" id="location" class="form-control" value={ this.state.project.location } />

          <label id="lblName">Total Steps in Project</label>
          <input type="number" name="totalSteps" id="totalSteps" class="form-control" value={ this.state.project.totalSteps } />


          <input type="submit" value="Add" class="form-control"></input>
        </form>
      </div>*/

      <div>
        <h2>Edit { this.state.project.name }</h2>
        <MuiThemeProvider>
          <form action="/projects" method="post" encType="application/x-www-form-urlencoded">
          <TextField
            type="text"
            name="name"
            hintText="Project name"
            floatingLabelText="Project name"
            value={ this.state.project.name }
            //onChange={e => this.change(e)}
            //errorText={this.state.usernameError}
            floatingLabelFixed
          />

          <DatePicker
            name="startDate"
            hintText="Start Date"
            floatingLabelText="Start Date"
            defaultDate={ this.state.project.startDate }
            floatingLabelFixed
          />

          <DatePicker
            name="endDate"
            hintText="End Date"
            floatingLabelText="End Date"
            defaultDate={ this.state.project.endDate }
            floatingLabelFixed
          />

          <SelectField
            multiple="true"
            value={ this.state.contributors }
          />


          <RaisedButton type="submit" label="Submit" onClick={e => this.onSubmit(e)} primary />

          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditProject;
