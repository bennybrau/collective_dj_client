LoginPage.prototype = new BasePage;
LoginPage.prototype.parent = BasePage.prototype;
LoginPage.prototype.constructor = LoginPage;

LoginPage.LOGIN_USER = "loginUser";
LoginPage.REGISTER_USER = "loginRegisterUser";

function LoginPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.loginButton = document.getElementById('loginButton');
    this.registerButton = document.getElementById('registerButton');
    this.emailAddressInput = document.getElementById('emailAddress');
    this.passwordInput = document.getElementById('password');
    
    if (this.loginButton)
        this.loginButton.onclick = Relegate.create(this, this.onLoginButtonClick, this);
    
    if (this.registerButton) {
        $(this.registerButton).click(Relegate.create(this, this.onRegisterButtonClick, this));
    }
        
}

LoginPage.prototype.onRegisterButtonClick = function()
{
    //console.log('onRegisterButtonClicked');
    this.dispatchEvent(LoginPage.REGISTER_USER);
}

LoginPage.prototype.onLoginButtonClick = function()
{
    this.emailAddress = this.emailAddressInput.value;
    this.password = this.passwordInput.value;
    this.dispatchEvent(LoginPage.LOGIN_USER);
}

LoginPage.prototype._doPageEnter = function(data)
{
    $(this.emailAddressInput).val('');
    $(this.passwordInput).val('');
}