"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var project_1 = require("../models/project");
var task_1 = require("../models/task");
router.post('/', function (req, res) {
    if (req.body._id) {
        task_1.default.findByIdAndUpdate(req.body._id, { "$set": {
                "title": req.body.title,
                "description": req.body.description,
                "details": req.body.details,
                "dueDate": req.body.dueDate
            }
        }, { "new": true, "upsert": true }, function (err, updatedProject) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(updatedProject);
            }
        });
    }
    else {
        var task = new task_1.default();
        task.title = req.body.title;
        task.description = req.body.description;
        task.details = req.body.details;
        task.dueDate = req.body.dueDate;
        task.save(function (err, newTask) {
            project_1.default.findOne({ name: req.body.project }).exec(function (err, result) {
                console.log(req.body.project);
                if (err) {
                    res.send(err);
                }
                else if (!result) {
                    console.log("none found");
                }
                else {
                    project_1.default.findByIdAndUpdate(result._id, { "$push": { "tasks": newTask._id } }, { "new": true, "upsert": true }, function (err, updatedProject) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(updatedProject);
                        }
                    });
                }
            });
        });
    }
});
router.get('/:tag', function (req, res) {
    project_1.default.findOne({ name: req.params['tag'] }).populate('tasks').exec(function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(results.tasks);
        }
    });
});
router.delete('/:tag', function (req, res) {
    task_1.default.remove({ _id: req.params['tag'] }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send('success');
        }
    });
});
exports.default = router;
