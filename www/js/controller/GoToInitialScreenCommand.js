GotoInitialScreenCommand.prototype = new puremvc.SimpleCommand;

function GotoInitialScreenCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

GotoInitialScreenCommand.prototype.execute = function(notification)
{
    if (this.facade.getCurrentUser())
    {
        this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: this.facade.getCurrentUser()});
    }
    else
    {
        this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
    }
}