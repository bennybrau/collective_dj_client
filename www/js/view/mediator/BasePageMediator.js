includeJS("js/view/component/BasePage.js");

BasePageMediator.prototype = new puremvc.Mediator;
BasePageMediator.prototype.parent = puremvc.Mediator.prototype;
BasePageMediator.prototype.constructor = BasePageMediator;

function BasePageMediator(mediatorName, viewComponent)
{
    puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
}

BasePageMediator.prototype.getView = function()
{
    return this.viewComponent;
}

BasePageMediator.prototype.getName = function()
{
    //to be overridden
    return null;
}

BasePageMediator.prototype.showPage = function(data)
{
    this.contextData = this._formatData(data);
    this.getView().onPageEnter(this.contextData);
    this.getView().show();
}

BasePageMediator.prototype.updatePage = function()
{
    this.getView().update();
}

BasePageMediator.prototype._formatData = function(data)
{
    //to be overriden
    return data;
}


BasePageMediator.prototype.hidePage = function()
{
    this.getView().onPageExit();
    this.getView().hide();
}

BasePageMediator.prototype.refresh = function()
{
    this.hidePage();
    this.showPage(this.contextData);
}