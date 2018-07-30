
var express = require("express");

var app = express();

var path = require("path");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "./index.html"));
    });

    app.get("/movies", function (req, res) {
        res.sendFile(path.join(__dirname, "./movies.html"));
    });

    app.get("/tv", function (req, res) {
        res.sendFile(path.join(__dirname, "./tv.html"));
    });

    app.get("/dynamic", function (req, res) {
        res.sendFile(path.join(__dirname, "./dynamic.html"));
    });
};