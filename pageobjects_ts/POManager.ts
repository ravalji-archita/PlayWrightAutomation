//const {LoginPage}=require('./LoginPage');
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import {Page} from '@playwright/test';

export class POManager{

    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    ordersHistoryPage:OrderHistoryPage;
    ordersReviewPage:OrdersReviewPage;
    page:Page;
constructor(page:Page)
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