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

TotemServiceProxy.prototype.whereAmI = function(username, includeAllOthers, successCallback, failureCallback)
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
                        
                                if (includeAllOthers) {
                                    var subProxy = ApplicationFacade.getInstance("COLLECTIVE_DJ").retrieveProxy(TotemServiceProxy.NAME);
                                    subProxy.whoIsHere(v.SMSHandle, function(userArray) {
                                                       if (userArray) {
                                                        var idx = -1;
                                                        for (var i = 0; i < userArray.length; i++) {
                                                            if (userArray[i].username == username) {
                                                                idx = i;
                                                                break;
                                                            }
                                                        }
                                                        if (idx != -1) userArray.splice(idx,1);
                                                       }
                                                if (successCallback) {
                                                       successCallback({venue: v, users:userArray});
                                                }
                                           },
                                           function(err) {if (failureCallback) failureCallback(err);});
                                }
                            }
                        else if (successCallback) {
                            successCallback({venue: v});
                        }
                        },
                        error: function(err) {
                            if (failureCallback) failureCallback(err);
                        }
                        
                        });
    }
}

TotemServiceProxy.prototype.whoIsHere = function(venueId, successCallback, failureCallback)
{
    if (venueId) {
        Parse.Cloud.run('whoIsHere', {VenueId : venueId}, {
                        
                        success: function(users) {
                        if (users) {
                            var usrArr = new Array();
                        for (var i = 0; i < users.length; i++) {
                                var u = new User(users[i].id);
                                u.username = users[i].get("username");
                                u.email = users[i].get("email");
                                u.avatarImgUrl = users[i].get("avatarImgUrl");
                                u.displayName = users[i].get("displayName");
                                u.SMS = users[i].get("SMS");
                                usrArr.push(u);
                            }
                            if (successCallback) successCallback(usrArr);
                        }
                        },
                        error: function(err) {
                        if (failureCallback) failureCallback(err);
                        }
                        
                        });
    }
}
