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
        user.emailAddress = parseUser.get("email");
        user.avatarImgUrl = parseUser.get("avatarImgUrl");
        user.displayName = parseUser.get("displayName");
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
                            u.emailAddress = user.get("email");
                            u.avatarImgUrl = user.get("avatarImgUrl");
                            u.displayName = user.get("displayName");
                            successCallback(u);
                         },
                         error: function(user, error) {
                            errorCallback(error);
                         }
                         
                         });
    }
}

AuthenticationProxy.prototype.logout = function()
{
    Parse.User.logOut();
}