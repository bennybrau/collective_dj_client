
PrepModelCommand.prototype = new puremvc.SimpleCommand;

function PrepModelCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

PrepModelCommand.prototype.execute = function(notification)
{
    //register proxies for data access
    console.log("PrepModelCommand executed");
}