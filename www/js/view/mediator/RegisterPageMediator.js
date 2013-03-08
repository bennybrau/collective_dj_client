includeJS("js/view/mediator/BasePageMediator.js");

RegisterPageMediator.prototype = new BasePageMediator;
RegisterPageMediator.prototype.parent = BasePageMediator.prototype;
RegisterPageMediator.prototype.constructor = RegisterPageMediator;

RegisterPageMediator.NAME = "RegisterPageMediator";

function RegisterPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [RegisterPageMediator.NAME, viewComponent]);
    
    if (this.getView())
    {
        this.getView().addEventListener(RegisterPage.REGISTER_USER, Relegate.create(this, this.onRegisterUser, this));
        this.getView().addEventListener(RegisterPage.CANCEL_REGISTER, Relegate.create(this, this.onCancelRegister, this));
    }
}

RegisterPageMediator.prototype.getName = function()
{
    return RegisterPageMediator.NAME;
}

RegisterPageMediator.prototype.onCancelRegister = function()
{
    this.sendNotification(AppConstants.DISPLAY_LOGIN);
}

RegisterPageMediator.prototype.onRegisterUser = function()
{
    var username = this.getView().emailAddress;
    var password = this.getView().password;
    var sms = this.getView().sms;
    var nickname = this.getView().nickname;
    
    if (username && password && sms) {
        //console.log("Going to register " + username + " with sms " + sms);
        this.sendNotification(AppConstants.REGISTER_USER, {username : username, password : password, sms: sms, nickname: nickname });
    }
    else {
        alert('Please enter all required information: email, password, phone number');
    }
}