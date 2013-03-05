includeJS("js/view/component/UIComponent.js");

BasePage.prototype = new UIComponent;
BasePage.prototype.parent = UIComponent.prototype;

function BasePage(divElem)
{
    UIComponent.apply(this, arguments);
    this.divElem = divElem;
}

BasePage.prototype.onPageEnter = function(data)
{
    //any initialization code
    
    this._doPageEnter(data);
}

BasePage.prototype.onPageExit = function()
{
    this._doPageExit();
}

BasePage.prototype.update = function()
{
    this._doUpdate();
}

BasePage.prototype._doUpdate = function()
{
    //to be overridden
}

BasePage.prototype._doPageEnter = function(data)
{
    //to be overridden
}

BasePage.prototype._doPageExit = function()
{
    //to be overridden
}

BasePage.prototype.hide = function()
{
    this.divElem.setAttribute("style", "display:none;");
}

BasePage.prototype.show = function()
{
    this.divElem.setAttribute("style", "display:block;");
}
