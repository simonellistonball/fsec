"use strict";
const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const util = require('util')
const app = express();

const apiRoot = '/api/v1';
var stores = {
  sensors: [],
  schemas: [],
  tenants: [], 
  users: []
}

app.set('port', (process.env.PORT || 3000));
app.set('always_persist', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const dataDir = __dirname + '/data/';

// Utility functions
function initStore(storeName) {
  var fileName = path.join(dataDir, storeName+".json");
  console.log("...initiating store: "+ fileName);
  fs.readFile(fileName, function(err, data) {
    if (err) {
     console.log('\nNo such file: '+ fileName)
     return;
    };
    stores[storeName] = JSON.parse(data);
    fs.watchFile(fileName, (() => {
      fs.readFile(fileName, function(err, data) {
        stores[storeName] = JSON.parse(data);
      })
    }).bind(fileName))
  });
}

function persistStore(storeName) {
  var fileName = path.join(dataDir, storeName+".json");
  console.log("...presisting store: "+ fileName);
  fs.writeFile(fileName, JSON.stringify(stores[storeName], null, 2), function(err) {
    console.log("["+storeName+" persisted]");
  });
}

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Request logger. Remove or modify as you see fit.
router.use(function(req, res, next) {
  console.log('\n'+(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')) + " Request: " + util.inspect(req.body));
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// ===================================
// Initialize stores form data files.
// Add new resource keys to `stores` object to enable them
for (var key in stores) initStore(key)

// Put special resource handlres HERE
// ...
// End of special resource handlers
// ===================================

// Default ReST Handlers
router.all(apiRoot+'/:resource/:id?', function(req, res, next){
  let resource = req.params.resource
  if(!stores[resource]) res.status(404).send("Such collection does not exist. (requested collection:"+resource+")");
  else next();
})
router.post(apiRoot+'/:resource', function(req, res) {
  let resource = req.params.resource;
  let model = req.body;
  model.id = Date.now();
  stores[resource].push(model);
  res.status(201).json(model);
  if(app.get('always_persist')) persistStore(resource);

})

router.get(apiRoot+'/:resource', function(req, res) {
  let resource = req.params.resource;
  let store = stores[resource];
  console.dir(req.query)
  // apply any sorting
  if (req.query.sort) {
    store = store.sort((a,b) => {
      if (a[req.query.sort] > b[req.query.sort]) {
        return (req.query.dir == "ascend" ? 1 : -1)
      } else if (a[req.query.sort] < b[req.query.sort]) {
        return (req.query.dir == "ascend" ? -1 : 1)
      } else {
        return 0;
      }
    });
  }
  if (req.query.format && req.query.format == 'list') {
    res.status(200).json(store.map((v)=>({ id: v.id, name: v.name })));  
  }
  res.status(200).json(store);

})

router.get(apiRoot+'/:resource/:id', function(req, res) {
  let id = req.params.id, resource = req.params.resource;
  let obj = stores[resource].filter((f)=>(f.id == id))[0];
  if(obj) {
    res.status(200).json(obj);
  }
  else {
    res.status(404).send("No object with id="+id+" in " + resource);
  }
})
router.delete(apiRoot+'/:resource/:id', function(req, res) {
  let id = req.params.id;
  let resource = req.params.resource;
  stores[resource] = stores[resource].filter(function(obj){
    if ('id' in obj && obj['id'] != this.id) {
      return true;
    }
    return false;
  }, {id});
  res.status(200).send("Object with id="+id+" in " + resource + " collection has been destroyed.");
  if(app.get('always_persist')) persistStore(resource);
})
router.put(apiRoot+'/:resource/:id', function(req, res) {
  let id = req.params.id, resource = req.params.resource;
  let store = stores[resource];
  let newModel = req.body;
  var index, obj, success = false;
  for (index in store) {
    obj = store[index];
    if(obj.id && obj.id == id) {
      newModel.id = obj.id;
      success = true;
      break;
    }
  }
  if(success) {
    res.status(200).json(newModel);
    store.splice(index, 1);
    store.push(newModel)
    if(app.get('always_persist')) persistStore(resource);
  }
  else {
    res.status(404).send("No object with id="+id+" has not been found in " + resource);
  }
})

// Start mock server
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
module.exports = app;

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})