"use strict";

const INPUT_TEXT_ELEMENT_CLASS = require("../pages/InputElementClass.js").InputTextElementClass;
const TODO_LIST_CLASS = require("./TodoListClass.js").TodoListClass;

/*
 * @class ScreenObjectClass - This is the Top level object for interacting with the web page. Through here you call down into the individual parts of the webapage.
 */
class ScreenObjectClass {

  /*
   * @constructor SecondScreenObject - The constructor for the Second Screen.
   * @param {Object} browser - The Nightwatch(Selenium) web driver instance.
   */
  constructor(browser) {
    this.browser = browser;
    this.HEADER_XPATH = '//body//header/h1';
    this.INPUT_FIELD_XPATH = '//body//header//input';
    this.FOOTER_SECTION_XPATH = '//body//footer';

    this.HEADER_TEXT = "todos";
    this.FOOTER_TEXT = "Double-click to edit a todo\nCreated by Sam Saccone and Colin Eberhardt using Angular2\nPart of TodoMVC";
    this.DEFAULT_INPUT_TEXT = "";

    this.findElements();
  }

  /*
   * @function findElements - find the constant interactive elements of the webpage
   */
  findElements(){
      this.newTodo = new INPUT_TEXT_ELEMENT_CLASS(this.browser, this.INPUT_FIELD_XPATH);
  }

  /*
   * @function getHeaderText - get the text of the header section of the webpage.
   * @param {callback} done - The function to call with the header's text.
   */
  getHeaderText(done){
    this.browser.useXpath();
    this.browser.getText(this.HEADER_XPATH, function(resultText){
      done(resultText.value);
    });
  }

  /*
   * @function getHeaderText - get the text of the header section of the webpage.
   * @param {callback} done - The function to call with the header's text.
   */
  getFooterText(done){
    this.browser.useXpath();
    this.browser.getText(this.FOOTER_SECTION_XPATH, function(resultText){
      done(resultText.value);
    });
  }

  /*
   * @function getTodoList - The function to get the list of items in the todo list
   * @param {callback} done - The function to call once the list of items has been obtained.
   */
  getTodoList(done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.getListDetails(done);
  }

  /*
   * @function toggleItemCompleted - Toggle the Item Completed state of the list item with the matching text.
   * @param {callback} done - The function to call once the item's completed checkbox has been toggeled.
   */
  toggleItemCompleted(itemText, done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.toggleListItem(itemText, done);
  }

  /*
   * @function clearCompleted - Click on the 'clear completed' button to remove all the items marked as completed.
   * @param {callback} done - The funciton to call once the 'clear completed' button has been pressed.
   */
  clearCompletedItems(done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.clearCompletedItems(done);
  }

  /*
   * @function removeItem - click the remove button on the item with the matching text provided.
   * @param {String} itemText - The text to find in the list of todo items.
   * @param {callback} done - The function to call once the item has been removed.
   */
  removeItem(itemText, done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.deleteListItem(itemText, done);
  }

  /*
   * @function toggleSeelctAllButton - The function to click on the select/deselect all items button.
   * @param {callback} done - The function to call once the select/desect all button has been pressed.
   */
  toggleSelectAllButton(done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.toggleSelectAllButton(done);
  }

  /*
   * @function editAnItem - The function to find an item in the list and edit its value. If saveEdit == false, then don't save the changes.
   * @param {string} itemText - The text to find in the list to edit the text of.
   * @param {String} newText - The new value to chnage the text to.
   * @param {boolean} saveEdit - If the value is false, then press the 'ESC' button to not accept the new value. Else, press 'Enter' to accept the new value
   * @param {callback} done - The function to call once the text editing is done.
   */
  editAnItem(itemText, newText, saveEdit, done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.editAnItem(itemText, newText, saveEdit, done);
  }

  /*
   * @function getCountOfItmesLeft - Get the text stating how many items are left to be completed in the todo list.
   * @param {callback} done - The funciton to handle the text of the items left.
   */
  getCountOfItemsLeft(done){
    const todoList = new TODO_LIST_CLASS(this.browser, "//section[@class='main']");
    todoList.getCountOfItemsLeft(done);
  }
}

module.exports = {ScreenObjectClass};
