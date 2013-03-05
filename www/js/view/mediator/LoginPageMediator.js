includeJS("js/view/mediator/BasePageMediator.js");

LoginPageMediator.prototype = new BasePageMediator;
LoginPageMediator.prototype.parent = BasePageMediator.prototype;
LoginPageMediator.prototype.constructor = LoginPageMediator;

LoginPageMediator.NAME = "LoginPageMediator";

function LoginPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [LoginPageMediator.NAME, viewComponent]);
    
    if (this.getView())
    {
        this.getView().addEventListener(LoginPage.LOGIN_USER, Relegate.create(this, this.onLoginUser, this));
    }
}

LoginPageMediator.prototype.getName = function()
{
    return LoginPageMediator.NAME;
}

LoginPageMediator.prototype.onLoginUser = function()
{
    var username = this.getView().emailAddress;
    var password = this.getView().password;
    
    if (username && password) {
        console.log("Logging in user: " + username);
        this.sendNotification(AppConstants.LOGIN_USER, {username : username, password : password });
    }
}