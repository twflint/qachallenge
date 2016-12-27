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

  '3. Get Performance Logs': function (client) {
     client.page.logsAnalyzer(client).analyzePerformanceLogs();
     client.page.logsAnalyzer(client).analyzeBrowserLogs();
  },
};
