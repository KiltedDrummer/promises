/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    // do something
    fs.readFile(filePath, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      var x = JSON.stringify(result.toString()).indexOf('\\n');
      var data = JSON.stringify(result.toString()).substr(1, x - 1);
      return data;
    })
    .catch((err, result) => {
      throw (err);
    });
  
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  return new Promise ((resolve, reject) => {
    request({
      method: 'GET',
      uri: url
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
    .then((response) => {
      return response.statusCode;
    })
    .catch((err) => { throw (err); } );
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
