var express = require('express');
var app = express();
 
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
 
app.get('/api/v1/config', function(req, res, next){
  res.json({ wsUrl: 'ws://localhost:3000/ws'})
});
 
app.ws('/ws', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});
 
app.listen(3000);