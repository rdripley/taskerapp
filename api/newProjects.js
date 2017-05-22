"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../db");
var project_1 = require("../models/project");
var router = express.Router();
router.post('/', function (req, res) {
    if (req.body._id) {
        project_1.default.findByIdAndUpdate(req.body._id, { "$set": { "name": req.body.name }
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
        var project = new project_1.default();
        project.name = req.body.name;
        project.tasks = [];
        project.save(function (err, newProject, result) {
            if (err) {
                res.send(err);
            }
            else {
                project_1.default.findByIdAndUpdate(result._id, { "$push": { "projects": newProject._id } }, { "new": true, "upsert": true }, function (updatedProject) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(updatedProject);
                    }
                });
            }
        });
    }
});
router.get('/', function (req, res) {
    db_1.default.db.collection('projects').find().toArray().then(function (projects) {
        res.json(projects);
    });
});
router.get('/:tag', function (req, res) {
    project_1.default.findOne({ _id: req.params['tag'] }).populate('tasks').exec(function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(results.tasks);
        }
    });
});
router.delete('/:tag', function (req, res) {
    project_1.default.remove({ _id: req.params['tag'] }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send('success');
        }
    });
});
exports.default = router;
