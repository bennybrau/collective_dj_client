includeJS("js/model/User.js");

AuthenticationProxy.prototype = new puremvc.Proxy;
AuthenticationProxy.NAME = "AuthenticationProxy";

function AuthenticationProxy()
{
    puremvc.Proxy.apply(this, [AuthenticationProxy.NAME, new Array()]);
}

AuthenticationProxy.prototype.getCurrentUser = function()
{
    var user = null;
    var parseUser = Parse.User.current();
    
    if (parseUser) {
        user = new User(parseUser.id);
        user.username = parseUser.get("username");
        user.email = parseUser.get("email");
        user.avatarImgUrl = parseUser.get("avatarImgUrl");
        user.displayName = parseUser.get("displayName");
        user.SMS = parseUser.get("SMS");
    }
    
    return user;
}

AuthenticationProxy.prototype.login = function(username, password, successCallback, errorCallback)
{
    if (username && password)
    {
        Parse.User.logIn(username, password, {
                         success:  function(user) {
                            var u = new User(user.id);
                            u.username = user.get("username");
                            u.email = user.get("email");
                            u.avatarImgUrl = user.get("avatarImgUrl");
                            u.displayName = user.get("displayName");
                            u.SMS = user.get("SMS");
                            successCallback(u);
                         },
                         error: function(user, error) {
                            errorCallback(error);
                         }
                         
                         });
    }
}

AuthenticationProxy.prototype.registerUser = function(username, password, sms, nickname, successCallback, errorCallback)
{
    if (username && password && sms) {
        var user = new Parse.User();
        user.set("username", username);
        user.set("email", username);
        user.set("password", password);
        user.set("SMS", sms);
        user.set("displayName", nickname);
        
        user.signUp(null, {
                    success: function(user) {
                    var u = new User(user.id);
                    u.username = user.get("username");
                    u.email = user.get("email");
                    u.avatarImgUrl = user.get("avatarImgUrl");
                    u.displayName = user.get("displayName");
                    u.SMS = user.get("SMS");
                    successCallback(u);
                    },
                    error: function(user,error) {
                    errorCallback(error);
                    }
        });
    }
}

AuthenticationProxy.prototype.logout = function()
{
    Parse.User.logOut();
}