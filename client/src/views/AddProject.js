import React, { Component } from 'react';

class AddProject extends Component {
  render() {
    return (
      <body>
        <div>
          <h2>Add Project</h2>

          <form action="/projects" method="post" encType="application/x-www-form-urlencoded">
            <label id="lblName">Project Name</label>
            <input type="text" name="name" id="name" />

            <label id="lblName">Start Date</label>
            <input type="date" name="startDate" id="startDate" />

            <label id="lblName">End Date</label>
            <input type="date" name="endDate" id="endDate" />

            <label id="lblName">Contributors</label>
            <input type="text" name="contributors" id="contributors" />

            <label id="lblName">Resources</label>
            <input type="text" name="resources" id="resources" />

            <label id="lblName">Location</label>
            <input type="text" name="location" id="location" />

            <label id="lblName">Total Steps in Project</label>
            <input type="number" name="totalSteps" id="totalSteps" />


            <input type="submit" value="Add"></input>
          </form>
        </div>
      </body>
    );
  }
}

export default AddProject;
