MainStatusPage.prototype = new BasePage;
MainStatusPage.prototype.parent = BasePage.prototype;
MainStatusPage.prototype.constructor = MainStatusPage;

MainStatusPage.LOGOUT_USER = "logoutUser";

function MainStatusPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.logoutButton = document.getElementById('logoutButton');
    
    if (this.logoutButton) {
        this.logoutButton.onclick = Relegate.create(this, this.onLogoutClick, this);
    }
}

MainStatusPage.prototype.onLogoutClick = function()
{
    this.dispatchEvent(MainStatusPage.LOGOUT_USER);
}