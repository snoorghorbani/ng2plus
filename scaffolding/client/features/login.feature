Feature: This feature describe the scenarios of the login part of our authentication component

  @authentication
  Scenario Outline: The user is using the login form
    Given I am in "login" page
    And '<username>' is the user username in the login form
    And '<password>' is the user password in the login form
    When submitting the login form
    Then the login form is validated '<valid>'

    Examples:
      | username      | password             | valid |
      |               |                      | false |
      |               | thisisavalidpassword | false |
      | samkwerri.be  | thisisavalidpassword | false |
      | sam@kwerri.be |                      | false |
      | sam@kwerri.be | thisisavalidpassword | true  |