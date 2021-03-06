MainStatusPage.prototype = new BasePage;
MainStatusPage.prototype.parent = BasePage.prototype;
MainStatusPage.prototype.constructor = MainStatusPage;
MainStatusPage.prototype.updateInt = null;

MainStatusPage.LOGOUT_USER = "logoutUser";
MainStatusPage.CHECK_IN_USER = "checkInUser";
MainStatusPage.REFRESH = "refresh";

function MainStatusPage(divElem)
{
    BasePage.apply(this, [divElem]);
    
    this.checkInButton = document.getElementById('checkInButton');
    this.venueChooser = document.getElementById('venueChooser');
    this.avatarImgThumbnail = document.getElementById('avatarImgThumbnail');
    this.userInfoPanel = document.getElementById('userInfo');
    this.venueInfoPanel = document.getElementById('venueInfo');
    this.whosHereInfoPanel = document.getElementById('whosHereInfo');
    
    if (this.checkInButton && this.venueChooser) {
        this.checkInButton.onclick = Relegate.create(this, this.onCheckInClick, this);
    }
    
}

MainStatusPage.prototype._doPageExit = function()
{
    if (this.updateInt) {
        window.clearInterval(this.updateInt);
        this.updateInt = null;
    }
    
    if (this.avatarImgThumbnail) $(this.avatarImgThumbnail).empty();
    if (this.userInfoPanel) $(this.userInfoPanel).empty();
    if (this.venueInfoPanel) $(this.venueInfoPanel).empty();
    if (this.whosHereInfoPanel) $(this.whosHereInfoPanel).empty();
}

MainStatusPage.prototype._doPageEnter = function(data)
{
    var userData = data.userData;
    if (userData)
    {
        if (userData.avatarImgUrl)
            $(this.avatarImgThumbnail).html('<li><div class="thumbnail"><img src="' + userData.avatarImgUrl + '"></div></li>');
        else
            $(this.avatarImgThumbnail).html('<li><div class="thumbnail"><img src="img/avatar_placeholder.png"></div></li>');
        
        $(this.userInfoPanel).html('<div class="row-fluid"><b>' + userData.displayName + '</b></div><div class="row-fluid">' + userData.email + '</div><div class="row-fluid">' + userData.SMS + '</div><div class="row-fluid"><button id="logoutButton" class="btn-mini btn-primary" type="button">Logout</button>');
        
        $('#logoutButton').click(Relegate.create(this, this.onLogoutClick, this));
    }
    
    var pgData = data.pageData;
    if (pgData) {
    
        var venueData = pgData.venue;
        if (venueData) {
            $(this.venueInfoPanel).html('<p class="text"><h5>Currently checked in at ' + venueData.name + '.</h5></p>');
        }
        else {
            //$(this.venueInfoPanel).empty();
        }
        
        var users = pgData.users;
        if (users) {
            var html = '<h5>Other users here:</h5><ul class="thumbnails">';
            for (var i = 0; i < users.length; i++) {
                if (users[i].avatarImgUrl)
                    html += '<li><div class="thumbnail"><img class="otherUserThumbnail" src="' + users[i].avatarImgUrl + '"></div></li>';
                else
                    html += '<li><div class="thumbnail"><img class="otherUserThumbnail" src="img/avatar_placeholder.png"></div></li>';
            }
            html += '</ul>';
            $(this.whosHereInfoPanel).html(html);
        }
        else {
            //$(this.whosHereInfoPanel).empty();
            //$(this.whosHereInfoPanel).hide();
        }
    }
    
    if (this.updateInt == null)
        this.updateInt = window.setInterval(Relegate.create(this, this.onRefreshStatus, this), 10000);
}

MainStatusPage.prototype.onRefreshStatus = function()
{
    this.dispatchEvent(MainStatusPage.REFRESH);
}


MainStatusPage.prototype.onLogoutClick = function()
{
    this._doPageExit();
    this.dispatchEvent(MainStatusPage.LOGOUT_USER);
}

MainStatusPage.prototype.onCheckInClick = function()
{
    this.selectedVenueId = this.venueChooser.value;
    this.dispatchEvent(MainStatusPage.CHECK_IN_USER);
}