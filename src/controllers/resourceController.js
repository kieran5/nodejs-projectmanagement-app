import mongoose from 'mongoose';
import { ResourceSchema } from '../models/resourceModel';

export const Resource = mongoose.model('Resource', ResourceSchema);

export const addNewResource = (req, res) => {
  let newResource = new Resource(req.body);

  newResource.save((err, resource) => {
    if (err) res.send(err);

    res.json(resource);
  });
};

export const updateResource = (req, res) => {
  Resource.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, resource) => {
    if (err) res.send(err);

    res.json(resource);
  });
};

export const deleteResource = (req, res) => {
  Project.remove({ _id: req.params.id }, (err, project) => {
    if (err) res.send(err);

    // Return a JSON message to alert user that the deletion has been a success
    res.json({ message: 'Successfully deleted project!' });
  });
};

export const getAllAvailableResources = (req, res) => {
  Resource.find({
    availability: true
  }, (err, resource) => {
    if (err) res.send(err);

    res.json(resource);
  });
};
