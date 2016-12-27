module.exports = {

  '@tags': ['ui'],
  '@disabled': false,

  before: function (client) {
    this.baseTestObj = client.page.baseTest(client);
    this.baseTestObj.doBefore();
  },

  after: function (client) {
    this.baseTestObj.doAfter();
  },

  '1. Confirm Page Title': function(client) {
    client.getTitle(function(resultTitle){
      client.verify.equal(resultTitle, client.globals.pageTitle, 'Verifying the title of the webpage');
    });
  },

  '2. Confirm the Page Elements': function(client) {
    const screenObjectClass = require('../pages/ScreenObjectClass.js').ScreenObjectClass;
    this.theWebpage = new screenObjectClass(client);
    this.theWebpage.getHeaderText(function(resultHeaderText){
      client.verify.equal(resultHeaderText, this.theWebpage.HEADER_TEXT, 'Verifying the header text for the webpage');
    }.bind(this));

    this.theWebpage.newTodo.getCurrentValue(function(resultInputText){
      client.verify.equal(resultInputText, this.theWebpage.DEFAULT_INPUT_TEXT, 'Verifying the header text for the webpage');
    }.bind(this));

    this.theWebpage.getFooterText(function(resultFooterText){
      client.verify.equal(resultFooterText, this.theWebpage.FOOTER_TEXT, 'Verifying the footer text for the webpage');
    }.bind(this));
  },

  '3. Get current list of items': function(client){
    this.theWebpage.getTodoList(function(returnList){
      this.currentList = returnList;
    }.bind(this));
  },

  '4. Add a todo list items': function(client) {
    this.theWebpage.newTodo.enterValueWithEnter('Goto Store', function(){
      this.currentList.push(['Goto Store',false]);
      this.theWebpage.getTodoList(function(returnList){
        client.verify.deepEqual(returnList,this.currentList, "Making sure the item got added to the list.");
      }.bind(this));
    }.bind(this));
  },

  '5. Get count of items left': function(client){
    this.theWebpage.getCountOfItemsLeft(function(returnItemsLeft){
      client.verify.equal(returnItemsLeft, "1 item left", "Verifying the number of items not completed.");
    });
  },

  '6. Get Performance Logs': function (client) {
    client.page.logsAnalyzer(client).analyzePerformanceLogs();
    client.page.logsAnalyzer(client).analyzeBrowserLogs();
  },
};
