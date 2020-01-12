const port = 8080;
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./connection/db');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routeIndex = require('./routes/router');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());


app.get('/',routeIndex);
app.get('/adminLogin',routeIndex);
app.get('/adminLoginPost',routeIndex);
app.post('/adminLoginPost',routeIndex);
app.post('/insertIntoDbox',routeIndex);
app.post('/insertIntoCodebase',routeIndex);
app.post('/deleteFromDbox',routeIndex);
app.post('/deleteFromCodebase',routeIndex);
app.listen(port);

