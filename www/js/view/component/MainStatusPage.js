MainStatusPage.prototype = new BasePage;
MainStatusPage.prototype.parent = BasePage.prototype;
MainStatusPage.prototype.constructor = MainStatusPage;

MainStatusPage.LOGOUT_USER = "logoutUser";
MainStatusPage.CHECK_IN_USER = "checkInUser";

function MainStatusPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.checkInButton = document.getElementById('checkInButton');
    this.venueChooser = document.getElementById('venueChooser');
    this.avatarImgThumbnail = document.getElementById('avatarImgThumbnail');
    this.userInfoPanel = document.getElementById('userInfo');
    
    if (this.checkInButton && this.venueChooser) {
        this.checkInButton.onclick = Relegate.create(this, this.onCheckInClick, this);
    }
}

MainStatusPage.prototype._doPageEnter = function(data)
{
    var userData = data.userData;
    if (userData)
    {
        if (userData.avatarImgUrl)
            $(this.avatarImgThumbnail).append('<li><div class="thumbnail"><img src="' + userData.avatarImgUrl + '"></div></li>');
        
        $(this.userInfoPanel).append('<div class="row-fluid"><b>' + userData.displayName + '</b></div><div class="row-fluid">' + userData.emailAddress + '</div><div class="row-fluid">' + userData.SMS + '</div><div class="row-fluid"><button id="logoutButton" class="btn-mini btn-primary" type="button">Logout</button>');
        
        $('#logoutButton').click(Relegate.create(this, this.onLogoutClick, this));
    }
}

MainStatusPage.prototype._doPageExit = function()
{
    if (this.avatarImgThumbnail)
        $(this.avatarImgThumbnail).empty();
    $(this.userInfoPanel).empty();
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