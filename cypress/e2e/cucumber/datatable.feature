Feature: TestFeature
    Scenario: Test the login feature
        Given I visit the zero.webappsecurity.com site
        # Given I sign in with 10 and 10
        Given I login as following
            | userName |  | password |
            | admin    |  | password |
            | admin1    |  | password1 |
            | admin2    |  | password2 |
        # Then I click Sign in button