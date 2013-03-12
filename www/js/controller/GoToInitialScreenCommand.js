GotoInitialScreenCommand.prototype = new puremvc.SimpleCommand;

function GotoInitialScreenCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

GotoInitialScreenCommand.prototype.execute = function(notification)
{
    var currentUser = this.facade.getCurrentUser();
    if (currentUser)
    {
        var totemProxy = this.facade.retrieveProxy(TotemServiceProxy.NAME);
        if (totemProxy)
        {
            totemProxy.whereAmI(currentUser.username, true, Relegate.create(this, this.onWhereAmISuccess, this),
                                function(err) { alert('Unable to get users current check-in');});
        }
    }
    else
    {
        this.sendNotification(AppConstants.DISPLAY_LOGIN, {});
    }
}

GotoInitialScreenCommand.prototype.onWhereAmISuccess = function(result)
{
    this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: this.facade.getCurrentUser(), venue: result.venue, allUsers: result.users});
}