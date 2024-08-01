Feature: Ecommerce validations
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "testar@mailinator.com" and "Test@123"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in Order History

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username              | password |
            | testar@mailinator.com | Test@123 |
            | hello@yopmail.com     | Test@123 |


