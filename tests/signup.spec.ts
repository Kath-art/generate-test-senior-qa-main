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

    test('Show warning message when privacy statement is not checked', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1943');
        await joinPage.enterMiddleName('');
        await joinPage.enterFirstName('Cristiano');
        await joinPage.enterLastName('Ronaldo');
        await joinPage.enterPreferredName('Martha');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.checkProductDisclosure();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.privacyAndDeclarationWarningMsg).toBeVisible();
    });

    test('Show warning message when product disclosure is not checked', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1943');
        await joinPage.enterMiddleName('');
        await joinPage.enterFirstName('Cristiano');
        await joinPage.enterLastName('Ronaldo');
        await joinPage.enterPreferredName('Martha');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.productDiscStatementWarningMsg).toBeVisible();
    });

    test('Show warning message when last name is empty', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Miss');
        await joinPage.selectGender('Female');
        await joinPage.enterDOB('21/03/1993');
        await joinPage.enterMiddleName('');
        await joinPage.enterFirstName("Mary")
        await joinPage.enterPreferredName('Martha');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.checkProductDisclosure();
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.lastNameWarningMsg).toBeVisible();
    });

    test('Show warning message when first name is empty', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1964');
        await joinPage.enterMiddleName('John');
        await joinPage.enterLastName('Doe');
        await joinPage.enterPreferredName('No first name');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.checkProductDisclosure();
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.firstNameWarnMessage).toBeVisible();
    });


    test('Show warning message when mobile number is empty', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1964');
        await joinPage.enterFirstName('Alexander');
        await joinPage.enterMiddleName('Phone');
        await joinPage.enterLastName('Bell');
        await joinPage.enterPreferredName('Engineer');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.checkProductDisclosure();
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.mobileNumberWarningMsg).toBeVisible();
    });

    test('Show warning message when email address is empty', async ({page}) => {

        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mrs');
        await joinPage.selectGender('Female');
        await joinPage.enterDOB('21/03/1987');
        await joinPage.enterFirstName('Martha');
        await joinPage.enterMiddleName('Cakes');
        await joinPage.enterLastName('Stewart');
        await joinPage.enterPreferredName('Baker');
        await joinPage.enterMobileNumber('215249857');
        await joinPage.checkProductDisclosure();
        await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        expect(joinPage.emailAddressWarningMsg).toBeVisible();
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

    test.describe('Validation where all required fields are empty', () => {
        test('Show all warning messages when required fields are empty', async ({page}) => {
            const joinPage = new JoinPage(page);
            await joinPage.clickContinue();
            expect(joinPage.dobWarnMsg).toBeVisible();
            expect(joinPage.emailAddressWarningMsg).toBeVisible();
            expect(joinPage.mobileNumberWarningMsg).toBeVisible();
            expect(joinPage.firstNameWarnMessage).toBeVisible();
            expect(joinPage.lastNameWarningMsg).toBeVisible();
            expect(joinPage.productDiscStatementWarningMsg).toBeVisible();
            expect(joinPage.privacyAndDeclarationWarningMsg).toBeVisible();
        });
    });

    test.describe('Happy path - all fields are filled in correctly', () => {
        test('Show all warning messages when required fields are empty', async ({page}) => {
            const joinPage = new JoinPage(page);

            await joinPage.selectTitle('Mrs');
            await joinPage.selectGender('Female');
            await joinPage.enterDOB('04/07/1934');
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

            await expect(joinPage.dobWarnMsg).not.toBeVisible();
            await expect(joinPage.emailAddressWarningMsg).not.toBeVisible();
            await expect(joinPage.mobileNumberWarningMsg).not.toBeVisible()
            await expect(joinPage.firstNameWarnMessage).not.toBeVisible()
            await expect(joinPage.lastNameWarningMsg).not.toBeVisible()
            await expect(joinPage.productDiscStatementWarningMsg).not.toBeVisible()
            await expect(joinPage.privacyAndDeclarationWarningMsg).not.toBeVisible()

            // Confirm join process moves to the next stage.
            const address = page.locator('h2');
            await expect(address).toContainText('Enter your residential address');
        });
    });



});
