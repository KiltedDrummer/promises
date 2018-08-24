/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
 
var fs = require('fs');
var Promise = require('bluebird');
const readPromise = Promise.promisify(fs.readFile);
const writePromise = Promise.promisify(fs.writeFile);
var pluck = require('../bare_minimum/promiseConstructor.js').pluckFirstLineFromFileAsync;

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  
  var data = filePaths.map((file) => {
    return pluck(file)
      .then((firstLine) => {
        return firstLine;
      })
      .catch((err) => {
        return err;
      });  
  });
  return Promise.all(data)
    .then((lines) => {
      var result = lines.join('\n');
      return writePromise(writePath, result);  
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};