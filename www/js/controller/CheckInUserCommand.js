CheckInUserCommand.prototype = new puremvc.SimpleCommand;

function CheckInUserCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

CheckInUserCommand.prototype.execute = function(notification)
{
    var venue = notification.getBody().venueId;
    var username = notification.getBody().username;
    
    if (venue && username)
    {
        var totemProxy = this.facade.retrieveProxy(TotemServiceProxy.NAME);
        if (totemProxy)
        {
            console.log("attempting checkin");
            totemProxy.checkIn(venue, username, Relegate.create(this, this.onCheckInSuccess, this), function(err) { alert('Unable to checkin user');});
        }
    }
}

CheckInUserCommand.prototype.onCheckInSuccess = function(result)
{
    alert("successfully checked in " + result.user.displayName + " at " + result.venue.name);
    //this.sendNotification(AppConstants.DISPLAY_MAIN_STATUS, {user: result.user, venue: result.venue});
}
