import * as express from 'express';
let router = express.Router();
import Project from '../models/project';
import Task from  '../models/task';

// Create or Update
router.post('/', (req, res) => {
  if(req.body._id) {
    Task.findByIdAndUpdate(req.body._id,
      { "$set": {
        "title": req.body.title,
        "description": req.body.description,
        "details": req.body.details,
        "dueDate": req.body.dueDate}
      },
      {"new": true, "upsert": true},
      function(err, updatedProject) {
        if (err) {
          res.send(err);
        } else {
          res.send(updatedProject);
        }
      });
  } else {
    let task:any = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.details = req.body.details;
    task.dueDate = req.body.dueDate;
    task.save((err, newTask) => {
      Project.findOne({name: req.body.project}).exec((err, result:any) => {
        console.log(req.body.project);
        if (err) {
          res.send(err);
        } else if (!result) {
          console.log("none found");
        } else {
          Project.findByIdAndUpdate(result._id, {"$push": {"tasks": newTask._id}}, {"new": true, "upsert": true},
            function (err, updatedProject) {
              if (err) {
                res.send(err);
              } else {
                res.send(updatedProject);
              }
            });

      }
    });
    })
  }
})

// Read
router.get('/:tag', (req, res)  => {
  Project.findOne({name: req.params['tag']}).populate('tasks').exec(function(err, results:any) {
    if(err) {
      res.send(err);
    } else {
      res.json(results.tasks);
    }
  });
})

// Delete
router.delete('/:tag', (req, res) => {
  Task.remove({_id: req.params['tag']}, (err) => {
    if(err) {
      res.send(err);
    } else {
      res.send('success');
    }
  })
})

export default router;
