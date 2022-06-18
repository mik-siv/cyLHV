// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-real-events/support";
import main from "../pages/main";

Cypress.Commands.add('acceptCookiesIfPresent', () => {
    cy.get(main.body).then(b => {
        if (b.find(main.cookiesPopUp).length) {
            cy.get(main.acceptCookies).click()
        }
    })
});

Cypress.Commands.add('assertCookieExists', (cookieName) => {
    return cy.getCookie(cookieName).should('exist')
});

Cypress.Commands.add('clickOneOfManyByLocator', (locator) => {
    cy.get(locator).its("length").then(length => {
        cy.get(locator).eq(Cypress._.random(length - 1)).click()
    })
});

Cypress.Commands.add('assertErrorMessage', (errorMsg) => {
    cy.contains(main.helpErrorMessage, errorMsg).should('be.visible');
});

Cypress.Commands.add('selectDropDownOption', (dropDown, option) => {
    cy.get(dropDown).select('').realPress('Enter')
    cy.get(dropDown).select(option).realClick()
    cy.get(dropDown).should("contain.text", option)
});

Cypress.Commands.add('typeIntoDropDown', (dropDown, text) => {
    cy.get(dropDown).select('').realType(text);
    cy.get(dropDown).should("contain.text", text)
});

Cypress.Commands.add('clickCheckBoxByText', (text) => {
    cy.contains(main.checkBox, text).should("be.visible").click();
});
