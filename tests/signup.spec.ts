import { expect, test } from '@playwright/test';
import { JoinPage } from "./JoinPage";
import AxeBuilder from "@axe-core/playwright";
import fs from 'fs';



test.describe('Join Page Validation', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/kiwisaver/join/');
        await page.setViewportSize({ width: 1024, height: 768 });

    });

    test('Show warning message when privacy statement is not checked', async ({page}) => {
        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1943');
        await joinPage.enterFirstName('Cristiano');
        await joinPage.enterMiddleName('Frank');
        await joinPage.enterLastName('Ronaldo');
        await joinPage.enterPreferredName('Martha');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.enterMobileNumber('21564532');

        await joinPage.checkProductDisclosure();  // only the label is visible.
        await expect(joinPage.productDiscStatementChk.locator('input')).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

        await joinPage.clickContinue();

        const privacyText = await joinPage.privacyAndDeclarationWarningMsg.textContent()
        expect(privacyText).toContain('Please confirm that you have read the above');
    });

    test('Show warning message when product disclosure is not checked', async ({page}) => {
        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mr');
        await joinPage.selectGender('Male');
        await joinPage.enterDOB('21/03/1943');
        await joinPage.enterFirstName('Cristiano');
        await joinPage.enterMiddleName('Mikey');
        await joinPage.enterLastName('Ronaldo');
        await joinPage.enterPreferredName('Messi');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.enterMobileNumber("21545879");

        await joinPage.checkPrivacyAndDeclaration();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

        await joinPage.clickContinue();

        const privacyText = await joinPage.productDiscStatementWarningMsg.textContent()
        expect(privacyText).toContain('Please confirm that you have read the above');
    });

    test('Show warning message when last name is empty', async ({page}) => {
        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Miss');
        await joinPage.selectGender('Female');
        await joinPage.enterDOB('21/03/1993');
        await joinPage.enterFirstName("Mary")
        await joinPage.enterMiddleName('Jane');
        await joinPage.enterPreferredName('Martha');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.enterMobileNumber("21459632");

        await joinPage.checkProductDisclosure();
        await expect(joinPage.productDiscStatementChk.locator('input')).toBeChecked();

        //await joinPage.checkPrivacyAndDeclaration();
        //await expect(joinPage.privacyAndDeclarationChk).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

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
        await joinPage.enterMobileNumber('216548211');

        await joinPage.checkProductDisclosure();
        await expect(joinPage.visibleProductDiscStatementChk).toBeChecked();

        //await joinPage.checkPrivacyAndDeclaration();
        //await expect(joinPage.visiblePrivacyAndDeclarationChk).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

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

        await joinPage.checkProductDisclosure()
        await expect(joinPage.visibleProductDiscStatementChk).toBeChecked();

        // await joinPage.checkPrivacyAndDeclaration();
        // await expect(joinPage.visiblePrivacyAndDeclarationChk).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

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
        await expect(joinPage.visibleProductDiscStatementChk).toBeChecked();

        // await joinPage.checkPrivacyAndDeclaration();
        // await expect(joinPage.visiblePrivacyAndDeclarationChk).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

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
        await expect(joinPage.visibleProductDiscStatementChk).toBeChecked();

        // await joinPage.checkPrivacyAndDeclaration();
        // await expect(joinPage.visiblePrivacyAndDeclarationChk).toBeChecked();

        await joinPage.checkSmsConsent();
        await expect(joinPage.smsConsentChk.locator('input')).toBeChecked();

        await joinPage.clickContinue();

        expect(joinPage.dobWarnMsg).toBeVisible();
    });

    test('Show all warning messages when all fields are empty', async ({page}) => {
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

    test('Verify no error messages are displayed when all form fields are filled correctly', async ({page}) => {
        const joinPage = new JoinPage(page);

        await joinPage.selectTitle('Mrs');
        await joinPage.selectGender('Female');
        await joinPage.enterDOB('04/07/1934');
        await joinPage.enterFirstName('Nancy');
        await joinPage.enterMiddleName('Agatha');
        await joinPage.enterLastName('Christie');
        await joinPage.enterPreferredName('Author');
        await joinPage.enterEmailAddress('triggskatherine@gmail.com');
        await joinPage.enterMobileNumber('215249857');
        await joinPage.checkProductDisclosure();
        // await joinPage.checkPrivacyAndDeclaration();
        await joinPage.checkSmsConsent();
        await joinPage.clickContinue();

        await expect(joinPage.dobWarnMsg).not.toBeVisible();
        await expect(joinPage.emailAddressWarningMsg).not.toBeVisible();
        await expect(joinPage.mobileNumberWarningMsg).not.toBeVisible()
        await expect(joinPage.firstNameWarnMessage).not.toBeVisible()
        await expect(joinPage.lastNameWarningMsg).not.toBeVisible()
        await expect(joinPage.productDiscStatementWarningMsg).not.toBeVisible()
        // await expect(joinPage.privacyAndDeclarationWarningMsg).not.toBeVisible()

            // Confirm join process moves to the next stage.
        const address = page.locator('h2');
        await expect(address).toContainText('Enter your residential address');
    });

    test('Confirm the page has no accessibility violations', async ({page}) => {
        // beforeEach takes us to the url under test.
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);

        if (accessibilityScanResults.violations.length > 0) {
            const lines: string[] = [];

            lines.push(`Accessibility issues found: ${accessibilityScanResults.violations.length}\n`);

            accessibilityScanResults.violations.forEach((violation, i) => {
                lines.push(`${i + 1}. ${violation.id} – ${violation.description}`);
                lines.push(`   Help: ${violation.helpUrl}`);

                violation.nodes.forEach((node, j) => {
                    lines.push(`   ${j + 1}) ${node.html}`);
                });

                lines.push('');
            });

            fs.writeFileSync('accessibility-report.txt', lines.join('\n'), { encoding: 'utf-8' });
        } else {
            fs.writeFileSync('accessibility-report.txt', 'No accessibility violations found', { encoding: 'utf-8' });
        }
    });
});
