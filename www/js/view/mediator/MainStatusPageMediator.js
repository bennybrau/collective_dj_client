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
    console.log("checking in to venue " + this.getView().selectedVenueId);
}