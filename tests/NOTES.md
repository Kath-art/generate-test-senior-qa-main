## Approach
- To ensure that the modification of page locators and page methods is easy, I decided to take a Page Object Model approach.
- All page locators/selectors exist inside `JoinPage.ts`, whereas the tests are in `signup.spec`.

## Tests
- Each test describes its expected outcome - for example, if one field is empty, if all are empty, or if none are empty.
- There is one test for the `happy path`, (where all fields are completed as expected), which verifies transition to the address page after the "Continue" button is clicked.
- An accessibility test exists too. This was possible by adding the Axe-Playwright library to the project.
- All reports and screenshots can be found either under the `playwright-report` directory or the `test-results`.
- Accessibility results can be found in the `accessibility-report.txt`.

## Findings
- Tested in Chromium which seem reasonably performant on its own. However, when I added in firefox and webkit, performance decreased and tests started to fail because of timeouts. I tried to remedy this, by running in only headless mode, but that didn't seem to make any difference. It seems that firefox is the browser with the most failures due to timeouts, so in the future I would do some investigation and fix it.
- Finding the correct locator for the Privacy check box proved particularly difficult. Even using the `label` with `click` rather than `check` didn't work. What I did notice was that the locator was "clicking" on the `Resources` link.  I think there is a problem with the index of my selector `field_agreeStatus[1]`.  This is particularly flaky so I would like to improve it.  In an attempt to get things up and running, I've commented out the statements which use the privacy checkbox.
- I'm not sure why the mobile number field is a `spinButton`, (and for the country code), as a mobile number would never be negative.
- Had I had more time, I would have liked to test each possible warning message for each field.
- And
- Thanks so much for the opportunity! :)