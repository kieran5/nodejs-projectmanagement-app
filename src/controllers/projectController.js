import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';

// Creating project variable so Project objects can be created
// Modelled around the schema we have built
// Each Project object will then be saved to our DB via mongoose
const Project = mongoose.model('Project', ProjectSchema);

// Export this function so we can call it in our routes file when
// the save project route (POST request) is called upon by the server
export const addNewProject = (req, res) => {
  // Temporary local variable to store new Project object
  // req.body is the form data posted by the user when creating a new project
  // We take each of those fields and compare with our model Schema
  // Before posting/saving to our Mongo database
  let newProject = new Project(req.body);

  newProject.save((err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};
