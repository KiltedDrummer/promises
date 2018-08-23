/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
// var readPromise = Promise.promisify(fs.readFile);
// var writePromise = Promise.promisify(fs.writeFile);
var getGitHub = require('./promisification').getGitHubProfileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // return fs.readFileAsync(readFilePath)
  //   .then((result) => {
  //     var username = result.substring(0, 11);
  //     getGitHub(username)
  //       .then((data) => {
  //         fs.writeFileAsync(writeFilePath, JSON.stringify(data));
  //       })
  //       .catch(error => {
  //         return error;
  //       });
  //   }).
  //   catch(err => {
  //     return err;
  //   });
    
  return fs.readFileAsync(readFilePath)
    .then((result) => {
      var username = result.toString().substring(0, 11);
      return getGitHub(username);
    })
    .then((data) => {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(data));
    })
    .catch(err => {
      return err;
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
