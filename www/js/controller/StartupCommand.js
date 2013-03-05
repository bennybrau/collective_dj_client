includeJS("js/controller/PrepControllerCommand.js");
includeJS("js/controller/PrepModelCommand.js");
includeJS("js/controller/PrepViewCommand.js");
includeJS("js/controller/GoToInitialScreenCommand.js");

StartupCommand.prototype = new puremvc.MacroCommand;

function StartupCommand()
{
    puremvc.MacroCommand.apply(this, arguments);
}

StartupCommand.prototype.initializeMacroCommand = function()
{
    this.addSubCommand(PrepControllerCommand);
    this.addSubCommand(PrepModelCommand);
    this.addSubCommand(PrepViewCommand);
    this.addSubCommand(GotoInitialScreenCommand);
}