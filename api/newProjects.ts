import * as express from 'express';
import * as mongodb from 'mongodb';
import database from '../db';
import Project from '../models/project';
import Task from  '../models/task';
let router = express.Router();

// Create or Update
router.post('/', (req, res) => {
  if(req.body._id) {
    Project.findByIdAndUpdate(req.body._id,
    { "$set":
      {"name": req.body.name}
    },
      { "new": true, "upsert": true},
      function(err, updatedProject) {
        if (err) {
          res.send(err);
        } else {
          res.send(updatedProject);
        }
      });
  } else {
    let project:any = new Project();
    project.name = req.body.name;
    project.tasks = [];
    project.save((err, newProject, result:any) => {
      if (err) {
        res.send(err);
      } else {
        Project.findByIdAndUpdate(result._id, {"$push": {"projects": newProject._id}}, {"new": true, "upsert": true},
          function(updatedProject) {
            if (err) {
              res.send(err)
            } else {
              res.send(updatedProject);
            }
        });
      }
    });
  }
});

// Read
router.get('/', (req, res) => {
  database.db.collection('projects').find().toArray().then((projects) => {
    res.json(projects);
  })
});

// Get single project
router.get('/:tag', (req, res)  => {
  Project.findOne({_id: req.params['tag']}).populate('tasks').exec(function(err, results:any) {
    if(err) {
      res.send(err);
    } else {
      res.json(results.tasks);
    }
  });
})

// Delete
router.delete('/:tag', (req, res) => {
  Project.remove({_id: req.params['tag']}, (err) => {
    if(err) {
      res.send(err);
    } else {
      res.send('success');
    }
  })
});

export default router;
