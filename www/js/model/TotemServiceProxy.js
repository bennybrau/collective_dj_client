TotemServiceProxy.prototype = new puremvc.Proxy;
TotemServiceProxy.NAME = "TotemServiceProxy";

function TotemServiceProxy()
{
    puremvc.Proxy.apply(this, [TotemServiceProxy.NAME, new Array()]);
}

TotemServiceProxy.prototype.checkIn = function(venueId, fromSMS, successCallback, failureCallback)
{
    if (venueId && fromSMS) {
        Parse.Cloud.run('checkIn',
                        {
                            VenueId: venueId,
                            From: fromSMS
                        },
                        {
                        success: function(result) {
                            if (successCallback) successCallback(result);
                        
                        },
                        error: function(err) {
                            console.log("Unable to checkin user " + fromSMS + " at venueid " + venueId);
                            if (failureCallback) failureCallback(err);
                        }
                        });
    }
}