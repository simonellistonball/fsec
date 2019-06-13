"use strict";
const ncp = require('ncp').ncp;
const path = require('path');
ncp(path.join(__dirname, 'seed'), path.join(__dirname, 'data'), function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});