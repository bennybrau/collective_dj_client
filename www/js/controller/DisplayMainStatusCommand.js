includeJS("js/view/mediator/MainStatusPageMediator.js");

DisplayMainStatusCommand.prototype = new puremvc.SimpleCommand;

function DisplayMainStatusCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayMainStatusCommand.prototype.execute = function(notification)
{
    console.log("DisplayMainStatusCommand executed");
    
    //TODO: implement login via proxy to Parse.
}