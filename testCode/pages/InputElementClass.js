"use strict";

const SYNC_LOOP = require("../pages/test_utils.js").syncLoop;

/*
 * @class InputTextElementClass - This is a handler class for input DOM elements that are text based.
 */
class InputTextElementClass {
  /*
   * @constructor InputTextElementClass - Takes in a browser instance and the xPath to the Input element of type text that will be handled.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   * @param {string} xPath - The xPath to the input element of type text to be handled.
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
    this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the input ielement to exist: " + this.elementXPath);
  }

  /*
   * @function getCurrentValue - Return the current value of the input element.
   * @param {callback} done - The function to handle the string value of the input element.
   */
  getCurrentValue(done) {
    this.browser.waitForElementPresent(this.elementXPath, 1000)
      .getValue(this.elementXPath, function (result) {
      done(result.value);
    });
  }

  /*
   * @function enterValueWithEnter - Change the value of the input element and press the Enter key afterwards.
   * @param {string} value - The text string to enter into the input element
   * @param {callback} done - The function to handle the aftermath of changing the value.
   */
  enterValueWithEnter(value, done) {
    this.browser.useXpath().waitForElementVisible(this.elementXPath, 1000, function(){
      // This function call is not working consistantly with data input. Some of the characters are being lost.
      // Replacing with a slower input.
      //this.browser.setValue(this.elementXPath, value.toString(), done);
      let valueToArray = value.toString().split('');
      this.browser.clearValue(this.elementXPath)
      SYNC_LOOP(valueToArray.length, function(loop){
        this.browser.setValue(this.elementXPath, valueToArray[loop.iteration()], loop.next);
      }.bind(this), function(){
        this.browser.setValue(this.elementXPath, this.browser.Keys.ENTER, done);
      }.bind(this));
    }.bind(this), "Making sure that the newTodo input is visible before interacting with it.");
  }

  /*
   * @function enterValueWithEnter - Change the value of the input element and press the Enter key afterwards.
   * @param {string} value - The text string to enter into the input element
   * @param {callback} done - The function to handle the aftermath of changing the value.
   */
  enterValueWithEsc(value, done) {
    this.browser.useXpath().waitForElementVisible(this.elementXPath, 1000, function(){
      // This function call is not working consistantly with data input. Some of the characters are being lost.
      // Replacing with a slower input.
      //this.browser.setValue(this.elementXPath, value.toString(), done);
      let valueToArray = value.toString().split('');
      SYNC_LOOP(valueToArray.length, function(loop){
        this.browser.setValue(this.elementXPath, valueToArray[loop.iteration()], loop.next);
      }.bind(this), function(){
        this.browser.setValue(this.elementXPath, this.browser.Keys.ESCAPE, done);
      }.bind(this));
    }.bind(this), "Making sure that the newTodo input is visible before interacting with it.");
  }

}

/*
 * @class InputToggleElementClass - This is a handler class for input DOM elements that are checkbox based.
 */
class InputToggleElementClass {

  /*
   * @constructor InputToggleElementClass - Takes in a browser instance and the xPath to the Input element of type checkbox that will be handled.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   * @param {string} xPath - The xPath to the input element of type checkbox to be handled.
   */
  constructor(browser, xPath){
    this.browser = browser;
    this.setXPath(xPath);

  }

  /*
   * @function setXPath - Stores the XPath value for finding the DOM element being used by this class.
   * @param {String} xPathValue - The XPath string to be used to find the DOM Element.
   */
  setXPath(xPathValue) {
    this.elementXPath = xPathValue;
    //this.textXpath = xPathValue + "//span";
    this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the input to exist: " + this.elementXPath);
  }

  /*
   * @function getCheckedStatus - Gets the value of the checked attribute and verifies that it is true.
   * @param {callback} done - The function to call with the value of the checked attribute.
   */
  getCheckedStatus(done){
    this.browser.getAttribute(this.elementXPath, 'checked', function(returnCheckedValue){
      // The returnCheckedValue.value is null, if the attribute is equl to false, so comparing the value to 'true'
      done(returnCheckedValue.value == 'true');
    });
  }

  /*
   * @function toggleCheckedStatus - Clicks on the checkbox element to toggle its checked status.
   * @param {callback} done - The function to call once the checkbox has been clicked on.
   */
  toggleCheckedStatus(done){
    this.browser.click(this.elementXPath, function(){
      this.browser.pause(1000, done);
    }.bind(this));
  }

}

module.exports = {InputTextElementClass,InputToggleElementClass};
