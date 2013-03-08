includeJS("js/view/component/UIComponent.js");
includeJS("js/view/component/BasePage.js");
includeJS("js/view/mediator/BasePageMediator.js");
includeJS("js/view/component/LoginPage.js");
includeJS("js/view/mediator/LoginPageMediator.js");
includeJS("js/view/component/RegisterPage.js");
includeJS("js/view/mediator/RegisterPageMediator.js");
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
    
    var register = new RegisterPage(document.getElementById('register'));
    var registerMediator = new RegisterPageMediator(register);
    this.facade.registerMediator(registerMediator);
    
    var mainStatus = new MainStatusPage(document.getElementById('mainStatus'));
    var mainStatusMediator = new MainStatusPageMediator(mainStatus);
    this.facade.registerMediator(mainStatusMediator);
    
}