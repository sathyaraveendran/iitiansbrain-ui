var express = require('express');
var routerIndex = express.Router();
var db = require('../connection/db');
var session = require('express-session');

routerIndex.get('/',function(req,res){ 
        db.otherExports.fetchValuesMenu(function(MenuData) {
               res.render('home',{MenuData:MenuData});
             });
});
routerIndex.get('/adminLogin', function(req, res) { res.render('index');});
routerIndex.get('/adminLoginPost', function(req, res) { res.render('editOptions');});
routerIndex.post('/adminLoginPost', function(req, res) { 
        var username= req.body.username;
        var password = req.body.password;
        db.otherExports.fetchValuesUsers(function(UsersData){
                UsersData.forEach(function(UsersData) {
                var sessionArray = [];
                if(UsersData.username === username && UsersData.pasword === password){  
                sessionArray.push(username);
                sessionArray.push(password);
                req.sessioncookie = sessionArray;
                res.render('editOptions');
                }
            });
        });
    });

routerIndex.post('/insertIntoDbox', function(req, res) { 
    var insertQueryForDbox = "insert into Dbox(`dbox_name`,`dbox_codebase`,`dbox_latest_drop`)values('"+req.body.environment+"', '"+req.body.codebase+"','"+req.body.latestDrop+"')";
    db.mainExports.query(insertQueryForDbox,function (err){if(err) throw err;});
    res.redirect('/adminLoginPost');
});
routerIndex.post('/insertIntoCodebase', function(req, res) { 
    var insertQueryForCodebase = "insert into codebase(`release`,`environment`,`date`,`jira`,`description`,`priority`)values('"+req.body.release+"', '"+req.body.environment+"','"+req.body.date+"','"+req.body.jira+"','"+req.body.description+"','"+req.body.priority+"')";
    db.mainExports.query(insertQueryForCodebase,function (err){if(err) throw err;});
    res.redirect('/adminLoginPost');
});
routerIndex.post('/deleteFromDbox', function(req, res) { 
    var id = req.body.id;
    var deleteQueryForDbox = "delete from Dbox where dbox_id = '"+id+"'";
    db.mainExports.query(deleteQueryForDbox,function (err){if(err) throw err;});
    res.redirect('/adminLoginPost');
});
routerIndex.post('/deleteFromCodebase', function(req, res) { 
    var id = req.body.id;
    var deleteQueryForCodebase = "delete from codebase where id = '"+id+"'";
    db.mainExports.query(deleteQueryForCodebase,function (err){if(err) throw err;});
    res.redirect('/adminLoginPost');
});

routerIndex.get('/logout', function(req, res) { 
    req.sessioncookie.user= null;
    res.redirect('/adminLogin');
});

module.exports = routerIndex;