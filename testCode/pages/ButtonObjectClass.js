"use strict";

/*
 * @class ButtonObjectClass - This is a handler class for button DOM elements.
 */
class ButtonObjectClass {
  /*
   * @constructor ButtonObject - Takes in a browser instance.
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
    //this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the button to exist: " + this.elementXPath);
   }

  /*
   * @function click - The function to perform a click on the element.
   * @param {callback} done - The function to handle the aftereffect of clicking on the element.
   */
  click(done) {
    this.browser.useXpath()
      .waitForElementPresent(this.elementXPath, 2000)
      .click(this.elementXPath, done);
  }
}

module.exports = {ButtonObjectClass};
