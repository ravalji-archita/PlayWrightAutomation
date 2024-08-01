Feature: Ecommerce validations
@Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    
    Then Verify error message is displayed

Examples: 
| username              | password |
| testar@mailinator.com | Test@123 |
| hello@yopmail.com     | Test@123 |


    
