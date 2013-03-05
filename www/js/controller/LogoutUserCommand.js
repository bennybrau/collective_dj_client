LogoutUserCommand.prototype = new puremvc.SimpleCommand;

function LogoutUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

LogoutUserCommand.prototype.execute = function(notification)
{
    var authProxy = this.facade.retrieveProxy(AuthenticationProxy.NAME);
    if (authProxy)
    {
        authProxy.logout();
    }
    
    this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
}
