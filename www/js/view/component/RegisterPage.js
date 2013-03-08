RegisterPage.prototype = new BasePage;
RegisterPage.prototype.parent = BasePage.prototype;
RegisterPage.prototype.constructor = RegisterPage;

RegisterPage.REGISTER_USER = "registerUser";
RegisterPage.CANCEL_REGISTER = "cancelRegister";

function RegisterPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.registerButton = document.getElementById('register_registerButton');
    this.cancelButton = document.getElementById('register_cancel');
    this.emailAddressInput = document.getElementById('register_emailAddress');
    this.passwordInput = document.getElementById('register_password');
    this.smsInput = document.getElementById('register_sms');
    this.nicknameInput = document.getElementById('register_nickname');
    
    if (this.registerButton)
        this.registerButton.onclick = Relegate.create(this, this.onRegisterButtonClick, this);
    
    if (this.cancelButton)
        this.cancelButton.onclick = Relegate.create(this, this.onCancelButtonClick, this);
}

RegisterPage.prototype.onCancelButtonClick = function()
{
    this.dispatchEvent(RegisterPage.CANCEL_REGISTER);
}

RegisterPage.prototype.onRegisterButtonClick = function()
{
    this.emailAddress = this.emailAddressInput.value;
    this.password = this.passwordInput.value;
    this.sms = this.smsInput.value;
    this.nickname = this.nicknameInput.value;
    
    this.dispatchEvent(RegisterPage.REGISTER_USER);
}

RegisterPage.prototype._doPageEnter = function(data)
{
    $(this.emailAddressInput).val('');
    $(this.passwordInput).val('');
    $(this.smsInput).val('');
    $(this.nicknameInput).val('');
}