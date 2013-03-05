includeJS("js/model/AuthenticationProxy.js");
includeJS("js/model/TotemServiceProxy.js");


PrepModelCommand.prototype = new puremvc.SimpleCommand;

function PrepModelCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

PrepModelCommand.prototype.execute = function(notification)
{
    Parse.initialize("Bwg2bgfendIUGwwNZHmjkzs9Zwxl3MMJ54xGw76t", "BQ4qpU7bIS7qOxvVV6FAnRXmgN1djAggEIQ0pMcY");
    
    this.facade.registerProxy(new AuthenticationProxy());
    this.facade.registerProxy(new TotemServiceProxy());
}