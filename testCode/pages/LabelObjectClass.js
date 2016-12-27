"use strict";

/*
 * @class LabelObject - This is a handler class for label DOM elements.
 */
class LabelObjectClass {
  /*
   * @constructor LabelObjectClass - Takes in a browser instance.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   * @param {String} xPath - The xPath to help find the specific button.
   */
  constructor(browser, xPath) {
    this.browser = browser;
    this.setXPath(xPath);
  }

  /*
   * @function setXPath - Stores the XPath value for finding the DOM element being used by this class.
   * @param {String} xPathValue - The XPath string to be used to find the DOM Element.
   */
  setXPath(xPathValue) {
    this.elementXPath = xPathValue;
    this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the label to exist: " + this.elementXPath);
  }

  /*
   * @function getText - Get the text of the label element.
   * @param {callback} done - The function to handle the text of the label element.
   */
  getText(done) {
    this.browser.useXpath().waitForElementVisible(this.elementXPath, 5000);
    this.browser.getText(this.elementXPath, function(theText){
      done(theText.value);
    });
  }

}

module.exports = {LabelObjectClass};
