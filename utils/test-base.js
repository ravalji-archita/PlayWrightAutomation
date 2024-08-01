const base = require('@playwright/test');


exports.customtest=base.test.extend(
    {
        testDataForOrder:  {
            username: "testar@mailinator.com",
            password:"Test@123",
            productName:"ZARA COAT 3"
        }
    }

)