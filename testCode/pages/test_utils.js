///////////////////////////////////////////////////////////////////////////////
/**
 *
 * Create an syncronious loop instance.
 * @constructor
 *
 * @classdesc
 * syncLoop allows you to write for loops that run in a sequential order, without the
 * need for promises.
 *
 * To use this function, call the syncLoop with the parameters:
 * @param iterations {number} Number of times to iterate.
 * @param process {function} Function to get called for each iteration.
 *
 *     function process(loop){ ... }
 *
 *     The loop parameter allows the process() function to control loop execution:
 *     loop.next()      - (Required) Increment to the next iteration.
 *     loop.iteration() - Get the current loop index.
 *     loop.break(callExit) - Break out of the loop immediately after process()
 *                            returns. If callExist is true, exit() will be
 *                            called.
 * @param [exit] (function) A function that, if provided, will get called when
 *   the loop exits.
 *
 *     Example:
 *
 *     var syncLoop = require(".../test/utils/test_utils.js").syncLoop;
 *     getMenuItems : function(callback){
 *       var browser = this.browser;
 *       var syncLoop = this.syncLoop;
 *
 *       browser.element("xpath","//div[@id='ui.HamburgerMenu']/div/div[2]/div", function(result) {
 *         browser.elementIdElements(result.value.ELEMENT, "css selector", "div", function (resultElements) {
 *           var returnValue = [];
 *           syncLoop(resultElements.value.length, function (loop) {
 *             var theElement = resultElements.value[loop.iteration()].ELEMENT;
 *             browser.elementIdAttribute(theElement, "innerText",
 *               function (elementResult) {
 *                 returnValue.push(elementResult.value);
 *                 loop.next();
 *               }
 *             );
 *           }, function(){
 *             callback(returnValue);
 *           }); // end of syncLoop
 *         });
 *       });
 *     },
 */

var syncLoop = function (iterations, process, exit){
  var index = 0,
      done = false,
      shouldExit = false;
  var loop = {
    next: function(){
      if (done) {
        if (shouldExit && exit) {
          return exit(); // Exit if we're done
        } else {
          return;
        }
      }
      // If we're not finished
      if (index < iterations) {
        index++; // Increment our index
        process(loop); // Run our process, pass in the loop
        // Otherwise we're done
      } else {
        done = true; // Make sure we say we're done
        if (exit) {
          exit(); // Call the callback on exit
        }
      }
    },
    iteration: function(){
      return index - 1; // Return the loop number we're on
    },
    break: function(end){
      done = true; // End the loop
      shouldExit = end; // Passing end as true means we still call the exit callback
      loop.next();
    }
  };
  loop.next();
  return loop;
};

///////////////////////////////////////////////////////////////////////////////

module.exports = {
  'syncLoop' : syncLoop
};
