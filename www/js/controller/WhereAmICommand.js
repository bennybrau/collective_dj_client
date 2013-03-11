WhereAmICommand.prototype = new puremvc.SimpleCommand;

function WhereAmICommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

WhereAmICommand.prototype.execute = function(notification)
{
    console.log('executing WhereAmICommand');
    var username = notification.getBody().username;
    
    if (username)
    {
        var totemProxy = this.facade.retrieveProxy(TotemServiceProxy.NAME);
        if (totemProxy)
        {
            totemProxy.whereAmI(username,
                            Relegate.create(this, this.onWhereAmISuccess, this),
                                function(err) { console.log(err.message);});
        }
    }
}

WhereAmICommand.prototype.onWhereAmISuccess = function(venue)
{
    console.log("venue is " + venue);
    this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: this.facade.getCurrentUser(), venue:venue});
}
