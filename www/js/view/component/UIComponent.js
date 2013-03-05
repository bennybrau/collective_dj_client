
function UIComponent(divElem)
{
    this.divElem = divElem;
    this.eventDispatcher = new EventDispatcher();
}

UIComponent.prototype.dispatchEvent = function(eventType/*String*/, args/*Object*/)
{
    var event = new EventS(eventType, this, args);
    this.eventDispatcher.dispatchEvent(event);
}

UIComponent.prototype.addEventListener = function(eventType, listener)
{
    this.eventDispatcher.addEventListener(eventType, listener);
}

UIComponent.prototype.removeEventListener = function(eventType, listener)
{
    this.eventDispatcher.removeEventListener(eventType, listener);
}
