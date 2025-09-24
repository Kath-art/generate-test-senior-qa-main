import { Page, Locator } from '@playwright/test';

export class JoinPage {
    page: Page;
    customerTitle: Locator;
    gender: Locator;
    dateOfBirth: Locator;
    firstName: Locator;
    middleName: Locator;
    lastName: Locator;
    preferredName: Locator;
    emailAddress: Locator;
    mobileNumber: Locator;
    productDiscStatementChk: Locator;
    visibleProductDiscStatementChk: Locator;
    privacyAndDeclarationChk: Locator;
    visiblePrivacyAndDeclarationChk: Locator;
    smsConsentChk: Locator;
    continueBtn: Locator;
    dobWarnMsg: Locator;
    firstNameWarnMessage: Locator;
    lastNameWarningMsg: Locator;
    emailAddressWarningMsg: Locator;
    mobileNumberWarningMsg: Locator;
    productDiscStatementWarningMsg: Locator;
    privacyAndDeclarationWarningMsg: Locator;

    constructor (page: Page) {
        this.page = page;
        this.customerTitle = page.locator('div[name="title"] div[tabindex="0"]');
        this.gender = page.getByText('Select gender');
        this.dateOfBirth = page.getByRole('textbox', { name: 'DD/MM/YYYY'});
        this.firstName = page.getByRole('textbox', { name: 'First name (required)'});
        this.middleName = page.getByRole('textbox', { name: 'Middle name(s)'});
        this.lastName = page.getByRole('textbox', { name: 'Last name (required)'});
        this.preferredName = page.getByRole('textbox', { name: 'Preferred name'});
        this.emailAddress = page.getByRole('textbox', { name: 'Email address (required)'});
        this.mobileNumber = page.getByTestId('MobileNumber');

        this.productDiscStatementChk = page.locator('label:has(input#field_agreeStatus\\[0\\])');
        this.visibleProductDiscStatementChk = page.locator('input#field_agreeStatus\\[0\\]'); // verify product disclosure checkbox is now visible

        this.privacyAndDeclarationChk = page.locator('label:has(input#field_agreeStatus\\[1\\])');
        // this.visiblePrivacyAndDeclarationChk = page.locator('input#field_agreeStatus\\[1\\]'); // verify privacy and declaration checkbox is visible
        this.visiblePrivacyAndDeclarationChk = page.locator('input#field_agreeStatus\\[1\\]'); // verify privacy and declaration checkbox is visible

        this.smsConsentChk = page.locator('label:has(input#field_smsConsent)');

        this.continueBtn = page.getByRole('button', { name: 'Continue'});

        this.dobWarnMsg = page.getByText('Incorrect or empty Date of birth');
        this.firstNameWarnMessage = page.getByText('First name is a required field');
        this.lastNameWarningMsg = page.getByText('Last name is a required field');
        this.emailAddressWarningMsg = page.getByText('Email is a required field');
        this.mobileNumberWarningMsg = page.getByText('Mobile number is a required field');
        this.productDiscStatementWarningMsg = page.locator('div[has-error="true"]').nth(0).locator('p:has-text("Please confirm that you have read the above")');
        this.privacyAndDeclarationWarningMsg = page.locator('div[has-error="true"]').nth(1).locator('p:has-text("Please confirm that you have read the above")');
    }

    async selectTitle(title: string) {
        await this.customerTitle.click();
        await this.page.getByTestId(title).click();
    }

    async selectGender(gender: string) {
        await this.gender.click();
        await this.page.getByTestId(gender).click();
    }

    async enterDOB(dobValue : string) {
        await this.dateOfBirth.fill(dobValue);
        await this.dateOfBirth.press('Enter');
    }

    async enterFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async enterMiddleName(middleName: string) {
        await this.middleName.fill(middleName);
    }

    async enterLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async enterPreferredName(preferredName: string) {
        await this.preferredName.fill(preferredName);
    }

    async enterEmailAddress(emailAddress: string) {
        await this.emailAddress.fill(emailAddress);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.mobileNumber.fill(mobileNumber);
    }

    async checkProductDisclosure() {
        await this.productDiscStatementChk.click(); // click instead of check for pseudo classes.
    }

    async checkPrivacyAndDeclaration() {
        await this.privacyAndDeclarationChk.click();
    }

    async checkSmsConsent() {
        this.smsConsentChk.click();
    }

    async clickContinue() {
        await this.continueBtn.click();
    }


 }
