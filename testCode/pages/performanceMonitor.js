/**
 * @fileOverview This class has functions to monitor the CPU/Memory performance on the client side at the time
 * of running the tests
 * @name PerformanceMonitor
 */

var os  = require('os-utils');

module.exports = function (browser) {

    /*This function uses the 'os-utils' library from node js to print out the CPU usage,
    the total memory and the free memory of the client that is running the Second Screen tests
    @function*/
    this.queryCpuAndMemoryUsage = function(nameOfTab) {
      os.cpuUsage(function(v){
        console.log( 'CPU Usage is (%): ' + v );
      });
      console.log('The total memory is ' + os.totalmem());
      console.log('The free memory is ' + os.freemem());
    };
};
