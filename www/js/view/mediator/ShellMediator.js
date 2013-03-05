ShellMediator.prototype = new puremvc.Mediator;

ShellMediator.NAME = "ShellMediator";

function ShellMediator(viewComponent)
{
    puremvc.Mediator.apply(this, [ShellMediator.NAME, viewComponent]);
    this.pageStack = new Array();
    this.pageToUpdate = null;
    
    //TODO: add event listeners
}

ShellMediator.prototype.getView = function()
{
    return this.viewComponent;
}

ShellMediator.prototype.listNotificationInterests = function()
{
    return [AppConstants.SHOW_PAGE];
}

ShellMediator.prototype.getCurrentPage = function()
{
    if (this.pageStack && this.pageStack.length > 0)
    {
        return this.pageStack[this.pageStack.length - 1];
    }
    else
        return undefined;
}

ShellMediator.prototype.hide = function()
{
    this.getView().hide();
}

ShellMediator.prototype.show = function()
{
    this.getView().show();
}

ShellMediator.prototype.popPage = function()
{
    var curPage = this.pageStack.pop();
    if (curPage)
        curPage.hidePage();
    
    var newPage = this.getCurrentPage();
    if (newPage)
        newPage.showPage();
}

ShellMediator.prototype.clearAllPages = function()
{
    var currPage = this.getCurrentPage();
    if (currPage)
        currPage.hidePage();
    
    this.pageStack = new Array();
}

ShellMediator.prototype.handleNotification = function(notification)
{
    switch(notification.getName())
    {
        case AppConstants.SHOW_PAGE:
            var curPage = this.getCurrentPage();
            
            var newPageMediator = notification.getBody().pageMediator;
            var newUserData = notification.getBody().userData;
            var newPageData = notification.getBody().pageData;
            
            this.pageStack.push({ mediator: newPageMediator, userData: newUserData, pageData: newPageData });
            
            if (curPage)
            {
                if (newPageMediator != curPage.mediator) {
                    curPage.mediator.hidePage();
                }
                newPageMediator.showPage({ userData: newUserData, pageData: newPageData });
            }
            else
            {
                newPageMediator.showPage({ userData: newUserData, pageData: newPageData });
            }
            
            break;
    }
}