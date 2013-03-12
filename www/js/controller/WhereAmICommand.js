WhereAmICommand.prototype = new puremvc.SimpleCommand;

function WhereAmICommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

WhereAmICommand.prototype.execute = function(notification)
{
    var username = notification.getBody().username;
    var includeAllOthers = (notification.getBody().includeAllOthers) ? notification.getBody().includeAllOthers : false;
    
    if (username)
    {
        var totemProxy = this.facade.retrieveProxy(TotemServiceProxy.NAME);
        if (totemProxy)
        {
            totemProxy.whereAmI(username, true,
                            Relegate.create(this, this.onWhereAmISuccess, this),
                                function(err) { console.log(err.message);});
        }
    }
}

WhereAmICommand.prototype.onWhereAmISuccess = function(result)
{
    this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: this.facade.getCurrentUser(), venue:result.venue, allUsers: result.users});
}
