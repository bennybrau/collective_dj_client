
Venue.prototype.name = null;
Venue.prototype.channelName = null;
Venue.prototype.SMSHandle = null;
Venue.prototype.location = null;

function Venue(id) {
    this.id = id;
}

Venue.prototype.toString = function()
{
    return "Venue {id : " + this.id + ", name : " + this.name + "}";
}