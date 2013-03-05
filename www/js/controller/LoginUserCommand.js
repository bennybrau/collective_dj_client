LoginUserCommand.prototype = new puremvc.SimpleCommand;

function LoginUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

LoginUserCommand.prototype.execute = function(notification)
{
    var username = notification.getBody().username;
    var password = notification.getBody().password;
    
    console.log("username = " + username);
    console.log("password = " + password);
    /*if (username && password)
    {
        var authProxy = this.facade.retrieveProxy(AuthenticationProxy.NAME);
        if (authProxy)
        {
            authProxy.loginUser(
                                username,
                                password,
                                Relegate.create(this, this.onLoginSuccess, this),
                                function(user,err) { alert('Unable to login user ' + username + ': ' + err.message); });
        }
    }*/
}

LoginUserCommand.prototype.onLoginSuccess = function(user)
{
    //TODO display main status.
    
    //this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: user});
}
