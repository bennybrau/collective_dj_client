includeJS("js/view/mediator/BasePageMediator.js");

MainStatusPageMediator.prototype = new BasePageMediator;
MainStatusPageMediator.prototype.parent = BasePageMediator.prototype;
MainStatusPageMediator.prototype.constructor = MainStatusPageMediator;

MainStatusPageMediator.NAME = "MainStatusPageMediator";

function MainStatusPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [MainStatusPageMediator.NAME, viewComponent]);
    
    if (this.getView())
    {
        this.getView().addEventListener(MainStatusPage.LOGOUT_USER, Relegate.create(this, this.onLogoutUser, this));
        this.getView().addEventListener(MainStatusPage.CHECK_IN_USER, Relegate.create(this, this.onCheckInUser, this));
        this.getView().addEventListener(MainStatusPage.REFRESH, Relegate.create(this, this.onRefresh, this));
    }
}

MainStatusPageMediator.prototype.getName = function()
{
    return MainStatusPageMediator.NAME;
}

MainStatusPageMediator.prototype.onLogoutUser = function()
{
    this.sendNotification(AppConstants.LOGOUT_USER, {});
}

MainStatusPageMediator.prototype.onCheckInUser = function()
{
    var user = this.contextData.userData;
    if (user)
    {
        this.sendNotification(AppConstants.CHECK_IN_USER, {venueId: this.getView().selectedVenueId, username: user.username});
    }
}

MainStatusPageMediator.prototype.onRefresh = function()
{
    var user = this.contextData.userData;
    if (user)
    {
        this.sendNotification(AppConstants.WHERE_AM_I, {username: user.username, includeAllOthers: true});
    }
}