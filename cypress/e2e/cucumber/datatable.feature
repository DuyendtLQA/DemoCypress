Feature: TestFeature

    Scenario: Test the login feature
        Given I visit the zero.webappsecurity.com site
        # Given I sign in with 10 and 10\
        # Given I sign in with "abc" and "def"
        Given I login as following
            | userName |  | password |
            | admin    |  | password |
            | admin1   |  | password1|
            | admin2   |  | password2|
        # Then I click Sign in button

@focus 
    Scenario Outline: Test the login feature
        Given I visit the zero.webappsecurity.com site
        # Given I sign in with 10 and 10\
        Given I sign in with "<userName>" and "<password>"
        Examples:
            | userName |  | password |
            | admin    |  | password |
            | admin1   |  | password1|
            | admin2   |  | password2|
            | admin3   |  | password3|

