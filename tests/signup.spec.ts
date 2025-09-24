import {expect, test} from '@playwright/test';
import {JoinPage} from "./JoinPage";

// Validation coverage – Trigger Continue with each
// required field empty (individually and collectively)
// and assert the corresponding error messages.
// Document the final set of validations you cover.

test.describe('Validation coverage where individual "required" fields are empty', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/kiwisaver/join/');
        await page.setViewportSize({ width: 1024, height: 768 });
    });

    test('Show warning message when DOB is empty', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mrs');
        await joinPage.selectGender('Female');
        await joinPage.enterFirstName('Mildred');
        await joinPage.enterMiddleName('Agatha');
        await joinPage.enterLastName('Christie');
        await joinPage.enterPreferredName('Author');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.enterMobileNumber('215249857');
        await joinPage.checkProductDisclosure();
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.dobWarnMsg).toBeVisible();
    });
});
