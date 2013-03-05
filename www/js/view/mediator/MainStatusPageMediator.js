includeJS("js/view/mediator/BasePageMediator.js");

MainStatusPageMediator.prototype = new BasePageMediator;
MainStatusPageMediator.prototype.parent = BasePageMediator.prototype;
MainStatusPageMediator.prototype.constructor = MainStatusPageMediator;

MainStatusPageMediator.NAME = "MainStatusPageMediator";

function MainStatusPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [MainStatusPageMediator.NAME, viewComponent]);
}

MainStatusPageMediator.prototype.getName = function()
{
    return MainStatusPageMediator.NAME;
}