var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'logger',
    streams:[{
        type:'rotating-file',
        level:'info',
        path: __dirname+'/logs/codebase.log',
        period:'1d'}]
    });
module.exports=log;