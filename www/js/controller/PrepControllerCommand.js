includeJS("js/controller/DisplayMainStatusCommand.js");
includeJS("js/controller/DisplayLoginCommand.js");
includeJS("js/controller/DisplayRegisterCommand.js");
includeJS("js/controller/LoginUserCommand.js");
includeJS("js/controller/LogoutUserCommand.js");
includeJS("js/controller/RegisterUserCommand.js");
includeJS("js/controller/CheckInUserCommand.js");

PrepControllerCommand.prototype = new puremvc.SimpleCommand;

function PrepControllerCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

PrepControllerCommand.prototype.execute = function(notification)
{
    console.log("PrepControllerCommand executed");
    
    //register other commands for interactions
    this.facade.registerCommand(AppConstants.DISPLAY_MAIN_STATUS, DisplayMainStatusCommand);
    this.facade.registerCommand(AppConstants.DISPLAY_LOGIN, DisplayLoginCommand);
    this.facade.registerCommand(AppConstants.DISPLAY_REGISTER_USER, DisplayRegisterCommand);
    this.facade.registerCommand(AppConstants.LOGIN_USER, LoginUserCommand);
    this.facade.registerCommand(AppConstants.LOGOUT_USER, LogoutUserCommand);
    this.facade.registerCommand(AppConstants.REGISTER_USER, RegisterUserCommand);
    this.facade.registerCommand(AppConstants.CHECK_IN_USER, CheckInUserCommand);
}