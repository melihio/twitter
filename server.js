"use strict";
exports.__esModule = true;
var tweet_1 = require("./db/v1/tweet");
var auth_1 = require("./db/v1/auth");
var express = require('express');
var app = express();
var port = process.env.PORT || 8888;
app.get('/', function (req, res) {
    res.send("Welcome To Server");
});
app.post('/auth/register', auth_1["default"].Register);
app.post('/auth/login', auth_1["default"].LogIn);
app.post('/tweet', tweet_1["default"].Send);
app.post('/like', tweet_1["default"].Like);
app.get('/tweet', tweet_1["default"].Get);
app["delete"]('/tweet', tweet_1["default"].Delete);
app.listen(port, function () {
    console.log("Server running on port : ".concat(port, "!"));
});
