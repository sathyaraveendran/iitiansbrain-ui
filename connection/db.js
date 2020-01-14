var mysql = require('mysql');

var connection = mysql.createConnection({
host:'localhost',
port:'3306',
user:'root',
password:'root',
database:'iitdb',
multipleStatements: true
});
connection.connect(function(err){
if(err){
    log.info('connection failed');
}
});     


module.exports.otherExports = {
    fetchValuesMenu : function(callbackMenu){
        connection.query("select * from menu",function (error, rows){callbackMenu(rows)}); 
    },
    fetchValuesAboutUs : function(callbackAboutUs){
        connection.query("select * from aboutus",function (error, rows){callbackAboutUs(rows)}); 
    },
    fetchValuesUsers : function(callbackUsers){
        connection.query("select * from users",function (error, rows){callbackUsers(rows)});
    }
};

exports.mainExports = connection;
