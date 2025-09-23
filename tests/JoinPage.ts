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
        this.customerTitle = page.getByText('Select title');
        this.gender = page.getByText('Select gender');
        this.dateOfBirth = page.getByRole('textbox', {name: 'DD/MM/YYYY'});
        this.firstName = page.getByRole('textbox', {name: 'First name (required)'});
        this.middleName = page.getByRole('textbox', {name: 'Middle name(s)'});
        this.lastName = page.getByRole('textbox', {name: 'Preferred name'});
        this.preferredName = page.getByRole('textbox', {name: 'Preferred name'});
        this.emailAddress = page.getByRole('textbox', {name: 'Email address (required)'});
        this.mobileNumber = page.getByTestId('MobileNumber');
        this.productDiscStatementChk = page.getByText('I have downloaded and read');
        this.privacyAndDeclarationChk = page.getByText('I have read and accepted');
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
 }
