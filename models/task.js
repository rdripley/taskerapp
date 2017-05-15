"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    details: String,
    dueDate: String
});
exports.default = mongoose.model('Task', TaskSchema);
