module.exports = function (browser) {

  this.doBefore = function () {
    var polyfills = require("../../js/utils/polyfills.js");
    polyfills.applyStandardTypePolyfills();
    require('native-promise-only');
    browser.init();
    browser.waitForElementVisible("body", 3000, function () {
      browser.globals.performanceMonitor = browser.page.performanceMonitor(browser);
    });
   // browser.globals.performanceMonitor = browser.page.performanceMonitor(browser);
  };

  this.doAfter = function () {
      browser.end();
  };
};
