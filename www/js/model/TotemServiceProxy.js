TotemServiceProxy.prototype = new puremvc.Proxy;
TotemServiceProxy.NAME = "TotemServiceProxy";

function TotemServiceProxy()
{
    puremvc.Proxy.apply(this, [TotemServiceProxy.NAME, new Array()]);
}

TotemServiceProxy.prototype.checkIn = function(venueId, username, successCallback, failureCallback)
{
    if (venueId && username) {
        Parse.Cloud.run('checkIn',
                        {
                            VenueId: venueId,
                            From: username
                        },
                        {
                        success: function(result) {
                            if (successCallback) successCallback(result);
                        
                        },
                        error: function(err) {
                            console.log("Unable to checkin user " + username + " at venueid " + venueId);
                            if (failureCallback) failureCallback(err);
                        }
                        });
    }
}