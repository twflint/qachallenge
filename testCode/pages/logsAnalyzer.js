/**
 * @fileOverview This class has a series of functions to analyze the log types that selenium
 * records at the run time of the tests. These will be useful to detect any warning or error messages
 * from the javascript console that are thrown when running a test.
 * @name LogsAnalyzer
 */

var assert = require('chai').assert;

module.exports = function (browser) {

    /*This function prints out an Array of the log types available.
    Usually, if the setup is correct, the log types are: browser, driver, performance
    @function*/
    this.getAvailableLogTypes = function(){
      browser.getLogTypes(function(typesArray) {
        console.log("The available log types are " + typesArray);
      });
      return browser;
    };

    /*This function gets the Performance logs from the selenium test instance and performs an analysis
    of the level of the logs. We should pay attention to log entries at the WARNING and SEVERE levels
    @function*/
    this.analyzePerformanceLogs = function(){
      var arrayOfErrors = [];
      var arrayOfWarnings = [];
      browser.getLog('performance', function(logEntriesArray) {
        console.log('Log length: ' + logEntriesArray.length);
        logEntriesArray.forEach(function(log) {
          switch (log.level){
            case "INFO":
            // console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
            // console.log("Found a INFO log entry on the Performance log");
            break;
            case "WARNING":
                console.log("Found a WARNING log entry on the Performance log");
                var warningEntry = '[' + log.level + '] ' + log.timestamp + ' : ' + log.message;
                arrayOfWarnings.push(warningEntry);
            break;
            case "SEVERE":
                console.log("Found a SEVERE log entry on the Performance log");
                var errorEntry = '[' + log.level + '] ' + log.timestamp + ' : ' + log.message;
                arrayOfErrors.push(errorEntry);
            break;
          };
        });
          browser.verify.equal(arrayOfErrors.length, 0, "The array of performance Errors is not empty. The current array is: " + arrayOfErrors);
          browser.verify.equal(arrayOfWarnings.length, 0, "The array of performance Warnings is not empty. The current array is: " + arrayOfWarnings);
      });
      return browser;
    };

    /*This function gets the Browser logs from the selenium test instance and performs an analysis
    of the level of the logs. We should pay attention to log entries at the WARNING and SEVERE levels
    @function*/
    this.analyzeBrowserLogs = function(){
      var arrayOfErrors = [];
      var arrayOfWarnings = [];
      browser.getLog('browser', function(logEntriesArray) {
        console.log('Log length: ' + logEntriesArray.length);
        logEntriesArray.forEach(function(log) {
          switch (log.level){
            case "WARNING":
                console.log("Found a WARNING log entry on the Browser log");
                var warningEntry = '[' + log.level + '] ' + log.timestamp + ' : ' + log.message;
                arrayOfWarnings.push(warningEntry);
            break;
            case "SEVERE":
                console.log("Found a SEVERE log entry on the Browser log");
                var errorEntry = '[' + log.level + '] ' + log.timestamp + ' : ' + log.message;
                arrayOfErrors.push(errorEntry);
            break;
          };
        });
          console.log(arrayOfErrors);
          browser.verify.equal(arrayOfErrors.length, 0, "The array of browser Errors is not empty. The current array is: " + arrayOfErrors);
          browser.verify.equal(arrayOfWarnings.length, 0, "The array of browser Warnings is not empty. The current array is: " + arrayOfWarnings);
      });
      return browser;
    };

}
