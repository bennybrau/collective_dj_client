LoginPage.prototype = new BasePage;
LoginPage.prototype.parent = BasePage.prototype;
LoginPage.prototype.constructor = LoginPage;

LoginPage.LOGIN_USER = "loginUser";

function LoginPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.loginButton = document.getElementById('loginButton');
    this.emailAddressInput = document.getElementById('emailAddress');
    this.passwordInput = document.getElementById('password');
    
    if (this.loginButton)
        this.loginButton.onclick = Relegate.create(this, this.onLoginButtonClick, this);
}

LoginPage.prototype.onLoginButtonClick = function()
{
    this.emailAddress = this.emailAddressInput.value;
    this.password = this.passwordInput.value;
    this.dispatchEvent(LoginPage.LOGIN_USER);
}