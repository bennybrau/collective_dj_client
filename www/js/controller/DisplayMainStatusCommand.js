includeJS("js/view/mediator/MainStatusPageMediator.js");

DisplayMainStatusCommand.prototype = new puremvc.SimpleCommand;

function DisplayMainStatusCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayMainStatusCommand.prototype.execute = function(notification)
{
    var curUser = notification.getBody().user;
    var curVenue = notification.getBody().venue;
    var allUsers = notification.getBody().allUsers;
    
    var pgData = { venue: curVenue, users: allUsers };
    
    var mainStatusMediator = this.facade.retrieveMediator(MainStatusPageMediator.NAME);
    this.sendNotification(AppConstants.SHOW_PAGE, {pageMediator: mainStatusMediator, userData: curUser, pageData:pgData});
}