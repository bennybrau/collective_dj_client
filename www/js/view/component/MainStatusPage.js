MainStatusPage.prototype = new BasePage;
MainStatusPage.prototype.parent = BasePage.prototype;
MainStatusPage.prototype.constructor = MainStatusPage;

MainStatusPage.LOGOUT_USER = "logoutUser";
MainStatusPage.CHECK_IN_USER = "checkInUser";

function MainStatusPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.logoutButton = document.getElementById('logoutButton');
    this.checkInButton = document.getElementById('checkInButton');
    this.venueChooser = document.getElementById('venueChooser');
    
    if (this.logoutButton) {
        this.logoutButton.onclick = Relegate.create(this, this.onLogoutClick, this);
    }
    
    if (this.checkInButton && this.venueChooser) {
        this.checkInButton.onclick = Relegate.create(this, this.onCheckInClick, this);
    }
}

MainStatusPage.prototype.onLogoutClick = function()
{
    this.dispatchEvent(MainStatusPage.LOGOUT_USER);
}

MainStatusPage.prototype.onCheckInClick = function()
{
    this.selectedVenueId = this.venueChooser.value;
    this.dispatchEvent(MainStatusPage.CHECK_IN_USER);
}