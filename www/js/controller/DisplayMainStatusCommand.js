includeJS("js/view/mediator/MainStatusPageMediator.js");

DisplayMainStatusCommand.prototype = new puremvc.SimpleCommand;

function DisplayMainStatusCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayMainStatusCommand.prototype.execute = function(notification)
{
    console.log("DisplayMainStatusCommand executed");
    
    var curUser = notification.getBody().user;
    
    var mainStatusMediator = this.facade.retrieveMediator(MainStatusPageMediator.NAME);
    this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: mainStatusMediator, userData: curUser});
}