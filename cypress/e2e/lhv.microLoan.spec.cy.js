import "cypress-real-events/support";
import dataHelper from "../dataHelper";
import microLoan from "../translations/microLoan";
import api from "../support/api";
import ml from "../pages/microLoanPageObject";
import main from "../pages/main";

describe('Micro loan application spec', () => {

    const randomText = dataHelper.genRandomWords(1)

    it('Micro Loans Flow', function () {
        cy.intercept(api.rolesEndpoint).as('roles');
        cy.visit(dataHelper.microLoanUrl);
        cy.wait('@roles');
        cy.intercept(api.consentEndpoint).as('consent');
        cy.acceptCookiesIfPresent();
        cy.wait('@consent').its('response.statusCode').should('eq', 204);
        cy.assertCookieExists('COOKIES_CONSENT');
        cy.contains('li', microLoan.availableAmounts).should('be.visible');
        cy.clickOneOfManyByLocator(ml.apply);

    });

    it('Fail cases', function () {
        cy.url().should('eq', `${Cypress.config('baseUrl')}${dataHelper.microLoanApplicationEndpoint}`);
        cy.get(ml.loanAmount).type(randomText).should('be.empty');
        cy.get(ml.loanAmount).type(dataHelper.genRandomNum(0, 5000).toString());
        cy.assertErrorMessage(microLoan.minAmountError);
        cy.get(ml.loanAmount).clear().type(dataHelper.genRandomNum(50000).toString());
        cy.assertErrorMessage(microLoan.maxAmountError);
        cy.selectDropDownOption(ml.companyType, 'Other');
        cy.assertErrorMessage(microLoan.companyTypeError);
        cy.typeIntoDropDown(ml.companyAge, 'Less than 6 months');
        cy.assertErrorMessage(microLoan.companyAgeError);
        cy.typeIntoDropDown(ml.companyWorkers, '10+');
        cy.assertErrorMessage(microLoan.companySizeError);
        cy.get(main.submitBtn).invoke('attr', 'disabled').should('eq', 'disabled');
    });

    it('Positive Case', function () {
        cy.get(ml.loanAmount).clear().type(dataHelper.genRandomNum(5000, 50000).toString());
        cy.selectDropDownOption(ml.companyType, 'Public limited company (AS)');
        cy.typeIntoDropDown(ml.companyAge, '6 months to 1 year');
        cy.typeIntoDropDown(ml.companyWorkers, '1');
        cy.clickCheckBoxByText(microLoan.taxTermsText);
        cy.get(main.submitBtn).invoke('attr', 'disabled').should('not.exist');
    });
})