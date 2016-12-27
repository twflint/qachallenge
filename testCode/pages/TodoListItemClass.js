"use strict";

const INPUT_TOGGLE_ELEMENT_CLASS = require("../pages/InputElementClass.js").InputToggleElementClass;
const LABEL_ELEMENT_CLASS = require("../pages/LabelObjectClass.js").LabelObjectClass;
const BUTTON_ELEMENT_CLASS = require("../pages/ButtonObjectClass.js").ButtonObjectClass;

/*
 * @class TodoListItemClass - This is the Top level object for interacting with the web page. Through here you call down into the individual parts of the webapage.
 */
class TodoListItemClass {

  /*
   * @constructor SecondScreenObject - The constructor for the Second Screen.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   */
  constructor(browser, itemXPath) {
    this.browser = browser;
    this.setXPath(itemXPath)

    this.findElements();
  }

  /*
   * @function setXPath - Stores the XPath value for finding the DOM element being used by this class.
   * @param {String} xPathValue - The XPath string to be used to find the DOM Element.
   */
  setXPath(xPathValue) {
    this.elementXPath = xPathValue;
    this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the list item to exist: " + this.elementXPath);
  }

  /*
   * @function findElements - find the constant interactive elements of the webpage
   */
  findElements(){
    this.completedCheckbox = new INPUT_TOGGLE_ELEMENT_CLASS(this.browser, this.elementXPath + "//input[@class='toggle']");
    this.itemText = new LABEL_ELEMENT_CLASS(this.browser, this.elementXPath + "//label");
    this.destroyButton = new BUTTON_ELEMENT_CLASS(this.browser, this.elementXPath + "//button[@class='destroy']");
  }

  /*
   * @function getDetails - Get the Text and completed status of this list item.
   * @param {callback} done - The function to pass the paired data of the item's text and its completed state.
   */
  getDetails(done){
    this.itemText.getText(function(returnText){
      this.completedCheckbox.getCheckedStatus(function(returnCompleted){
        done([returnText, returnCompleted]);
      });
    }.bind(this));
  }

  /*
   * @function moveCursorToItem - Moves the cursor to the current item, so it can be interacted with. This is used for the doubleclick as well as to show the delete button.
   * @param {callback} done - The function to call once the cursor has moved to this item's location.
   */
  moveCurserToItem(done){
    this.browser.moveToElement('xpath',this.elementXPath, null, null, done);
  }

  /*
   * @function doubleClickItem - Double click on this item to edit its text.
   * @param {callback} done - The function to call once the item has been double clicked on.
   */
  doubleClickItem(done){
    this.moveCurserToItem(function(){
      this.browser.doubleClick(done);
    }.bind(this));
  }
}

module.exports = {TodoListItemClass};
