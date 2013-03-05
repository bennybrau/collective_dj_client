MainStatusPage.prototype = new BasePage;
MainStatusPage.prototype.parent = BasePage.prototype;
MainStatusPage.prototype.constructor = MainStatusPage;

function MainStatusPage(divElem)
{
    BasePage.apply(this, [divElem]);
}