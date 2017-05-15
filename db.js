"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectionString = 'mongodb://mongoUser:D0omsday@ds141950.mlab.com:41950/codercampsdb';
var mongodb = require("mongodb");
var Database = (function () {
    function Database() {
    }
    Database.connect = function () {
        var _this = this;
        return mongodb.MongoClient.connect(connectionString).then(function (db) {
            _this.db = db;
        }).catch(function (err) {
            console.log(err);
        });
    };
    return Database;
}());
exports.default = Database;
