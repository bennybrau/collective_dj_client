includeJS("js/view/mediator/RegisterPageMediator.js");

DisplayRegisterCommand.prototype = new puremvc.SimpleCommand;

function DisplayRegisterCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayRegisterCommand.prototype.execute = function(notification)
{
    console.log("DisplayRegisterCommand executed");
    var registerPageMediator = this.facade.retrieveMediator(RegisterPageMediator.NAME);
    this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: registerPageMediator, userData:null, pageData:null});
}