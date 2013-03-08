RegisterUserCommand.prototype = new puremvc.SimpleCommand;

function RegisterUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

RegisterUserCommand.prototype.execute = function(notification)
{
    var username = notification.getBody().username;
    var password = notification.getBody().password;
    var sms = notification.getBody().sms;
    var nickname = notification.getBody().nickname;
    
    if (username && password && sms)
    {
        var authProxy = this.facade.retrieveProxy(AuthenticationProxy.NAME);
        if (authProxy)
        {
            console.log("attempting register and login");
            authProxy.registerUser(username,
                            password,sms,nickname,
                            Relegate.create(this, this.onRegisterSuccess, this),
                            function(err) { alert('Unable to register user ' + username + ': ' + err.message); });
        }
    }
}

RegisterUserCommand.prototype.onRegisterSuccess = function(user)
{
    this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: this.facade.getCurrentUser()});
}
