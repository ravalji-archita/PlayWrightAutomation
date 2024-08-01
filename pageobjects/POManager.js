const {LoginPage}=require('./LoginPage');
const {DashboardPage}=require('./DashboardPage');
const {CartPage}=require('./CartPage');
const {OrderHistoryPage} = require('./OrderHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');

class POManager{

constructor(page)
{
     this.page=page;
     this.loginPage=new LoginPage(this.page);
     this.dashboardPage=new DashboardPage(this.page);
     this.cartPage = new CartPage(this.page);
     this.ordersHistoryPage = new OrderHistoryPage(this.page);
     this.ordersReviewPage = new OrdersReviewPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getCartPage()
{
    return this.cartPage;
}
getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

}
module.exports={POManager};