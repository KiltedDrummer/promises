/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, result) => {
    if (err) {
      callback(err, result);
    } else {
      var x = JSON.stringify(result.toString()).indexOf('\\n');
      var data = JSON.stringify(result.toString()).substr(1, x - 1);
      
      callback(err, data);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request({method: 'GET', uri: url},
    function(error, response, body) {
      if (error) {
        callback(error, response);
      } else {
        callback(error, response.statusCode);
      }
    }); 
};


// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
