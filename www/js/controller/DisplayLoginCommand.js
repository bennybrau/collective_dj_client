includeJS("js/view/mediator/LoginPageMediator.js");

DisplayLoginCommand.prototype = new puremvc.SimpleCommand;

function DisplayLoginCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayLoginCommand.prototype.execute = function(notification)
{
    console.log("DisplayLoginCommand executed");
    
    var loginPageMediator = this.facade.retrieveMediator(LoginPageMediator.NAME);
    this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: loginPageMediator, userData: null, pageData: null});
}