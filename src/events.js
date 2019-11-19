const express = require('express');
const request = require('request');
const fs = require('fs');
const filename = '../db.json';
let programs = require(filename);


const api_key = 'kqtwdcapd2a5hth6aqw4h65f';

function createRouter() {
  const router = express.Router();
  // the routes are defined here
  router.get('/',function(req,res,next){
    if (programs.length === 0) {
        res.status(200).json({});
    }
    res.status(200).json(programs);
  });
  router.get('/event', function (req, res, next) {
  rootids = [15171223,15481959,17462348,16381191];
  var result = {}
  result.data = [];
  var completed_requests = 0;
  for (i = 0;i<rootids.length;i++){
    request('http://data.tmsapi.com/v1.1/programs/'+rootids[i]+'?api_key='+api_key, {json:true},(err,res,body) => {
    if (err) { return console.log(err); }
    let obj = {}
    obj.rootId = body.rootId;
    obj.title = body.title;
    obj.description = body.shortDescription;
    obj.cast = body.cast;
    result.data.push(obj);
    completed_requests++;
    if (completed_requests == rootids.length){ 
        fs.writeFile('db.json',JSON.stringify(result),'utf8',(err) => {
            if (err)
                res.status(500).json({'Error':err.message});
        });
    }
  });
}
  res.status(200).json({status: 'Database Initialized successfully'});
});
  return router;
}

module.exports = createRouter;