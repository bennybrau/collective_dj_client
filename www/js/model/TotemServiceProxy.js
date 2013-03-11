includeJS("js/model/Venue.js");

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

TotemServiceProxy.prototype.whereAmI = function(username, successCallback, failureCallback)
{
    if (username) {
        Parse.Cloud.run('whereAmI', {username:username}, {
                        success: function(venue) {
                            var v = null;
                            if (venue) {
                                v = new Venue(venue.id);
                                v.name = venue.get("name");
                                v.channelName = venue.get("channelName");
                                v.SMSHandle = venue.get("SMSHandle");
                                v.location = venue.get("location");
                            }
                            if (successCallback) successCallback(v);
                        },
                        error: function(err) {
                            if (failureCallback) failureCallback(err);
                        }
                        
                        });
    }
}