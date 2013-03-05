includeJS("js/view/component/UIComponent.js");
includeJS("js/view/component/BasePage.js");
includeJS("js/view/mediator/BasePageMediator.js");
includeJS("js/view/component/LoginPage.js");
includeJS("js/view/mediator/LoginPageMediator.js");
includeJS("js/view/mediator/ShellMediator.js");
includeJS("js/view/component/MainStatusPage.js");
includeJS("js/view/mediator/MainStatusPageMediator.js");

PrepViewCommand.prototype = new puremvc.SimpleCommand;

function PrepViewCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

PrepViewCommand.prototype.execute = function(notification)
{
    console.log("PrepViewCommand executed");
    
    var shell = new ShellMediator(document.getElementById('app'));
    var shellMediator = new ShellMediator(shell);
    this.facade.registerMediator(shellMediator);
    
    var login = new LoginPage(document.getElementById('login'));
    var loginMediator = new LoginPageMediator(login);
    this.facade.registerMediator(loginMediator);
    
}