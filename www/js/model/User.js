
User.prototype.avatarImgUrl = null;
User.prototype.username = null;
User.prototype.emailAddress = null;
User.prototype.displayName = null;
User.prototype.SMS = null;

function User(id) {
    this.id = id;
}

User.prototype.toString = function()
{
    return "User {id : " + this.id + ", username : " + this.username + "}";
}