"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ProjectSchema = new mongoose.Schema({
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
});
exports.default = mongoose.model('Project', ProjectSchema);
