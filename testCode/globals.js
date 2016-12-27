//Modified from example found at:
//https://github.com/nightwatchjs/nightwatch/blob/master/examples/globalsModule.js
// const EventListenerClassNew = require("./pages/qaInterfaces/EventListenerClassNew.js");

module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure : false,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval : 750,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout : 5000,


  // The consistant tilte of the webpage.
  pageTitle : 'Angular2 • TodoMVC',

  before: function(done){
    done();

  },

  after: function(done){
    console.log("STOP AFTER EVERYTHING!!!");
    done();
  }


};
