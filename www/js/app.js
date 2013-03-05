includeJS("js/controller/StartupCommand.js");

ApplicationFacade.prototype = new puremvc.Facade;
ApplicationFacade.prototype.parent = puremvc.Facade.prototype;
ApplicationFacade.prototype.constructor = ApplicationFacade;

function ApplicationFacade(key)
{
    puremvc.Facade.apply(this, arguments);
}

ApplicationFacade.getInstance = function(key)
{
    if (!puremvc.Facade.hasCore(key))
    {
        new ApplicationFacade(key);
    }
    var retVal = puremvc.Facade.getInstance(key);
    return retVal;
}

ApplicationFacade.prototype.startup = function()
{
    this.sendNotification(AppConstants.STARTUP);
}

ApplicationFacade.prototype.initializeController = function()
{
    puremvc.Facade.prototype.initializeController.call(this);
    this.registerCommand(AppConstants.STARTUP, StartupCommand);
}

ApplicationFacade.prototype.getCurrentUser = function()
{
    var user = null;
    
    /*var authProxy = this.retrieveProxy(AuthenticationProxy.NAME);
    if (authProxy)
    {
        user = authProxy.getCurrentUser();
    }
     */
    return user;
}