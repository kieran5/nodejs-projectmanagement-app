import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';
import { User } from './userController';
import { Resource } from './resourceController';

// Creating project variable so Project objects can be created
// Modelled around the schema we have built
// Each Project object will then be saved to our DB via mongoose
export const Project = mongoose.model('Project', ProjectSchema);

// Export this function so we can call it in our routes file when
// the save project route (POST request) is called upon by the server
export const addNewProject = (req, res) => {
  // Temporary local variable to store new Project object
  // req.body is the form data posted by the user when creating a new project
  // We take each of those fields and compare with our model Schema
  // Before posting/saving to our Mongo database
  let newProject = new Project({
    name: req.body.name,
    creator: req.session.username || req.body.creator,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    contributors: req.body.contributors,
    resources: req.body.resources,
    location: req.body.location,
    totalSteps: req.body.totalSteps
  });



  newProject.save((err, project) => {
    if (err) res.send(err);

    // Update chosen contributors project arrays so users current projects stay updated
    /*var contributors = req.body.contributors;
    for(var i=0; i < contributors.length; i++) {
      User.findOneAndUpdate({ '_id': contributors[i] },{ $push: { projects: project._id } }, { safe: true, upsert: true }, (err) => {
        if (err) res.send(err);
      });
    }*/

    // Update creators project list as well
    /*User.findOneAndUpdate({ '_id': req.session.userID || req.body.creator },{ $push: { projects: project._id } }, { safe: true, upsert: true }, (err) => {
      if (err) res.send(err);
    });*/

    // Update resource availability if the resource has been selected
    /*var resources = req.body.resources;
    for(var i=0; i < resources.length; i++) {
      Resource.findOneAndUpdate({ '_id': resources[i] }, { availability: false }, { new: true }, (err) => {
        if (err) res.send(err);
      });
    }*/

    //res.json(project);
    res.redirect('/');
  });
};

// Exported function for use on our default GET Request
// Used to display all projects on homepage
export const getAllProjects = (req, res) => {
  Project.find({ deletionFlag: false }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

//
//
export const getProjectByID = (req, res) => {
  // Load project collection
  // Use mongoose built in findById method on collection
  // Make use of id parameter from the route (projectRoutes ':/id') to find which project we are looking for
  Project.findById(req.params.id, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

//
//
export const updateProject = (req, res) => {
  // Load project collection
  // Use mongoose method on collection
  // Pass id from route parameter in to method param
  // Pass request body in so we know what data we are updating
  // Tell it that we will be returning new data so that the modified document is returned rather than the original
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

//
//
export const deleteProject = (req, res) => {
  // Pass in id to remove similar to update
  // TODO: Will possibly changes this ID used in update and delete to our own ID's
  // Mongo assigns very long id's that we probably don't want to be seen in our URLs
  Project.remove({ _id: req.params.id }, (err, project) => {
    if (err) res.send(err);

    // Return a JSON message to alert user that the deletion has been a success
    res.json({ message: 'Successfully deleted project!' });
  });
};


export const searchProjectByName = (req, res) => {
  Project.find({ name: req.params.search }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};


export const softDeleteProject = (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, { deletionFlag: true }, { new: true }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};


export const progressProjectToNextStep = (req, res) => {
  //var currentStep = 0;
  Project.findOne({ _id: req.params.id }, 'progressStep totalSteps', (err, project) => {
    //currentStep = project.progressStep;
    //console.log(currentStep);

    if(project.progressStep < project.totalSteps) {
      Project.findOneAndUpdate({ _id: req.params.id }, { progressStep: project.progressStep + 1 }, { new: true }, (err, project) => {
        if (err) res.send(err);

        // If project has been progressed to final step then free up the projects resources
        if(project.progressStep == project.totalSteps) {
          var resources = project.resources;
          for(var i=0; i < resources.length; i++) {
            Resource.findOneAndUpdate({ '_id': resources[i] }, { availability: true }, (err) => {
              if (err) res.send(err);
            });
          }
        }

        res.json(project);
      });
    } else {
      res.json("Project already completed.");
    }
  });


};
