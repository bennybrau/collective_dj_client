LoginUserCommand.prototype = new puremvc.SimpleCommand;

function LoginUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

LoginUserCommand.prototype.execute = function(notification)
{
    var username = notification.getBody().username;
    var password = notification.getBody().password;
    
    if (username && password)
    {
        var authProxy = this.facade.retrieveProxy(AuthenticationProxy.NAME);
        if (authProxy)
        {
            authProxy.login(username,
                            password,
                            Relegate.create(this, this.onLoginSuccess, this),
                            function(err) { alert('Unable to login user ' + username + ': ' + err.message); });
        }
    }
}

LoginUserCommand.prototype.onLoginSuccess = function(user)
{
    var totemProxy = this.facade.retrieveProxy(TotemServiceProxy.NAME);
    totemProxy.whereAmI(user.username, true, Relegate.create(this, this.onWhereAmISuccess, this),
                        function(err) { alert('Unable to get current check-in location for user ' + user.username);});
    
    
}

LoginUserCommand.prototype.onWhereAmISuccess = function(result)
{
    var user = this.facade.getCurrentUser();
    
    this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: user, venue:result.venue, allUsers: result.users});
}
