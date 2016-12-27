"use strict";

const INPUT_TOGGLE_ELEMENT_CLASS = require("../pages/InputElementClass.js").InputToggleElementClass;
const LABEL_ELEMENT_CLASS = require("../pages/LabelObjectClass.js").LabelObjectClass;
const BUTTON_ELEMENT_CLASS = require("../pages/ButtonObjectClass.js").ButtonObjectClass;
const SYNC_LOOP = require("../pages/test_utils.js").syncLoop;
const TODO_LIST_ITEM_CLASS = require("./TodoListItemClass.js").TodoListItemClass;
const INPUT_TEXT_ELEMENT_CLASS = require("../pages/InputElementClass.js").InputTextElementClass;

/*
 * @class TodoListItemClass - This is the Top level object for interacting with the web page. Through here you call down into the individual parts of the webapage.
 */
class TodoListClass {

  /*
   * @constructor SecondScreenObject - The constructor for the Second Screen.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   */
  constructor(browser, itemXPath) {
    this.browser = browser;
    this.setXPath(itemXPath)
  }

  /*
   * @function setXPath - Stores the XPath value for finding the DOM element being used by this class.
   * @param {String} xPathValue - The XPath string to be used to find the DOM Element.
   */
  setXPath(xPathValue) {
    this.elementXPath = xPathValue;
    // this.browser.useXpath().waitForElementPresent(this.elementXPath, 5000, "Waiting for the list item to exist: " + this.elementXPath);
  }

  /*
   * @function findElements - find the constant interactive elements of the webpage
   * @param {callback} done - The function to call once the eleemnts of the list have been found.
   */
  findElements(done){
    this.toggleAllItems = new INPUT_TOGGLE_ELEMENT_CLASS(this.browser, this.elementXPath + "//input[@class='toggle-all']");
    this.listIncompleteCount = new LABEL_ELEMENT_CLASS(this.browser, this.elementXPath +  "/../footer[@class='footer']/span");
    this.clearCompletedItemsButton = new BUTTON_ELEMENT_CLASS(this.browser, this.elementXPath + "/../footer[@class='footer']//button[@class='clear-completed']");
    this.listItemsList = [];
    this.browser.getAttribute(this.elementXPath + "/ul[@class='todo-list']", "childElementCount", function(returnChildCount){
      SYNC_LOOP(returnChildCount.value, function(loop){
        this.listItemsList.push(new TODO_LIST_ITEM_CLASS(this.browser, this.elementXPath + "/ul[@class='todo-list']/li[" + (loop.iteration()+1).toString() + "]"));
        loop.next();
      }.bind(this), done);
    }.bind(this));
  }

  /*
   * @function getListDetails - Retun a list containing the list pair fo each item's text and completed status.
   * @param {callback} done - The function to call with the list of items' data.
   */
  getListDetails(done){
    this.listItemsList = [];
    this.browser.element('xpath',this.elementXPath, function(returnElementID){
      if (returnElementID.status != 0){
        done([]);
      } else {
        this.browser.isVisible(this.elementXPath, function(returnIsVisible){
          let returnlist = [];
          this.findElements(function(){
            SYNC_LOOP(this.listItemsList.length, function(loop){
              this.listItemsList[loop.iteration()].getDetails(function(returnItemDetails){
                returnlist.push(returnItemDetails);
                loop.next();
              });
            }.bind(this), function(){
              done(returnlist);
            });
          }.bind(this));

        }.bind(this));
      }
    }.bind(this));
  }

  /*
   * @function toggleListItem - The function to toggle the completed status of the itme matching the given text, and return it's index in the list.
   * @param {String} itemText - The Text to use to find the specific item being looked for.
   * @param {callback} done - The function to call with the index of the edited item, or -1 if the item is not found.
   */
  toggleListItem(itemText, done){
    let foundIndex = -1;
    this.browser.element('xpath',this.elementXPath, function(returnElementID){
      if (returnElementID.status != 0){
        done();
      } else {
        this.browser.isVisible(this.elementXPath, function(returnIsVisible){
          let returnlist = [];
          this.findElements(function(){
            SYNC_LOOP(this.listItemsList.length, function(loop){
              this.listItemsList[loop.iteration()].getDetails(function(returnItemDetails){
                if (returnItemDetails[0] == itemText){
                  this.listItemsList[loop.iteration()].completedCheckbox.toggleCheckedStatus(function(){
                    foundIndex = loop.iteration();
                    loop.break(true);
                  });
                } else {
                  loop.next();
                }
              }.bind(this));
            }.bind(this), function(){
              console.log("We might have found our item");
              done(foundIndex);
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  /*
   * @function clearCompletedItems - Click on the 'clear completed' button to remove all of the completed items in the todo list.
   * @param {callback} done - The function to call once the button has been pressed.
   */
  clearCompletedItems(done){
    const clearCompletedItemsButton = new BUTTON_ELEMENT_CLASS(this.browser, this.elementXPath + "/../footer[@class='footer']//button[@class='clear-completed']");
    clearCompletedItemsButton.click(done);
  }

  /*
   * @function deleteListItem - Find the item with the matching text provided and delete it from the list.
   * @param {String} itemText - The text to find in the list of items, that will be deleted.
   * @param {callback} done - The function to call with the index of the item removed, or -1 if it was not found.
   */
  deleteListItem(itemText, done){
    let foundIndex = -1;
    this.browser.element('xpath',this.elementXPath, function(returnElementID){
      if (returnElementID.status != 0){
        done();
      } else {
        this.browser.isVisible(this.elementXPath, function(returnIsVisible){
          let returnlist = [];
          this.findElements(function(){
            SYNC_LOOP(this.listItemsList.length, function(loop){
              this.listItemsList[loop.iteration()].getDetails(function(returnItemDetails){
                if (returnItemDetails[0] == itemText){
                  this.listItemsList[loop.iteration()].moveCurserToItem(function(){
                    this.listItemsList[loop.iteration()].destroyButton.click(function(){
                      foundIndex = loop.iteration();
                      loop.break(true);
                    });
                  }.bind(this));
                } else {
                  loop.next();
                }
              }.bind(this));
            }.bind(this), function(){
              console.log("We might have found our item");
              done(foundIndex);
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  /*
   * @function toggleSelectAllButton - The function to click on the button to select/deselect all the items in the list.
   * @param {callback} done - The function to call once the toggle button has been clicked on.
   */
  toggleSelectAllButton(done){
    let toggleAllItems = new INPUT_TOGGLE_ELEMENT_CLASS(this.browser, this.elementXPath + "//input[@class='toggle-all']");
    toggleAllItems.toggleCheckedStatus(done);
  }

  /*
   * @function editAnItem - The function to find an item in the list and edit its value. If saveEdit == false, then don't save the changes.
   * @param {string} itemText - The text to find in the list to edit the text of.
   * @param {String} newText - The new value to chnage the text to.
   * @param {boolean} saveEdit - If the value is false, then press the 'ESC' button to not accept the new value. Else, press 'Enter' to accept the new value
   * @param {callback} done - The function to call once the text editing is done.
   */
  editAnItem(itemText, newText, saveEdit, done) {
    let foundIndex = -1;
    this.browser.element('xpath',this.elementXPath, function(returnElementID){
      if (returnElementID.status != 0){
        done();
      } else {
        this.browser.isVisible(this.elementXPath, function(returnIsVisible){
          let returnlist = [];
          this.findElements(function(){
            SYNC_LOOP(this.listItemsList.length, function(loop){
              this.listItemsList[loop.iteration()].getDetails(function(returnItemDetails){
                if (returnItemDetails[0] == itemText){
                  this.listItemsList[loop.iteration()].doubleClickItem(function(){
                    foundIndex = loop.iteration();
                    loop.break(true);
                  }.bind(this));
                } else {
                  loop.next();
                }
              }.bind(this));
            }.bind(this), function(){
              console.log("We might have found our item");
              if ( foundIndex != -1){
                let editField = new INPUT_TEXT_ELEMENT_CLASS(this.browser, "//input[@class='edit']");
                if (saveEdit !== false){
                  editField.enterValueWithEnter(newText, function(){
                    done(foundIndex);
                  });
                } else {
                  editField.enterValueWithEsc(newText, function(){
                    done(foundIndex);
                  });
                }
              } else {
                done(foundIndex);
              }
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  /*
   * @function getCountOfItemsLeft - The function to get the items left text for the todo list.
   * @param {callback} done - The function to call for handlign the text.
   */
  getCountOfItemsLeft(done){
    this.browser.element("xpath",this.elementXPath +  "/../footer[@class='footer']/span", function(returnValue){
      if (returnValue.status != 0){
        done("");

      } else {
        let listIncompleteCount = new LABEL_ELEMENT_CLASS(this.browser, this.elementXPath +  "/../footer[@class='footer']/span");
        listIncompleteCount.getText(done);
      }
    }.bind(this));
  }
}

module.exports = {TodoListClass};
