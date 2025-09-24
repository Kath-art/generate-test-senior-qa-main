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
    privacyAndDeclarationChk: Locator;
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
        this.customerTitle = page.getByLabel('field_title');
        this.gender = page.getByText('Select gender');
        this.dateOfBirth = page.getByRole('textbox', {name: 'DD/MM/YYYY'});
        this.firstName = page.getByRole('textbox', {name: 'First name (required)'});
        this.middleName = page.getByRole('textbox', {name: 'Middle name(s)'});
        this.lastName = page.getByRole('textbox', {name: 'Preferred name'});
        this.preferredName = page.getByRole('textbox', {name: 'Preferred name'});
        this.emailAddress = page.getByRole('textbox', {name: 'Email address (required)'});
        this.mobileNumber = page.getByTestId('MobileNumber');
        this.productDiscStatementChk = page.locator('#field_agreeStatus\\[0\\]');
        this.privacyAndDeclarationChk = page.locator('#field_agreeStatus\\[1\\]');
        this.smsConsentChk = page.getByText(' I consent to receive SMS messages from Generate');
        this.continueBtn = page.getByRole('button', {name: 'Continue'});
        this.dobWarnMsg = page.getByText('Incorrect or empty Date of birth');
        this.firstNameWarnMessage = page.getByText('First name is a required field');
        this.lastNameWarningMsg = page.getByText('Incorrect or empty Date of birth');
        this.emailAddressWarningMsg = page.getByText('Email is a required field');
        this.mobileNumberWarningMsg = page.getByText('Mobile number is a required field');
        this.productDiscStatementWarningMsg = page.getByText('Please confirm that you have read the about');
        this.privacyAndDeclarationWarningMsg = page.getByText('Please confirm that you have read the about');  // todo, these shouldn't be the same.. maybe use the array index?
    }

    async selectTitle(title: string) {
        await this.customerTitle.click();
        await this.page.getByTestId(title).click();
    }

    async selectGender(gender: string) {
        await this.gender.click();
        await this.page.getByTestId(gender).click();
    }

    async enterDOB(dateOfBirth : string) {
        await this.dateOfBirth.fill(dateOfBirth);
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
        await this.productDiscStatementChk.isVisible();
        this.productDiscStatementChk.check();
    }

    async checkPrivacyAndDeclaration() {
        await this.privacyAndDeclarationChk.isVisible();
        this.privacyAndDeclarationChk.check();
    }

    async checkSmsConsent() {
        await this.smsConsentChk.isVisible();
        this.smsConsentChk.check();
    }

    async clickContinue() {
        await this.continueBtn.click();
    }


 }
