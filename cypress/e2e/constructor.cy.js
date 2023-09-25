import * as selectors from "./selectors"
import BASE_URL from "../../src/utils/api"


describe('burger constructor page', function () {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(selectors.localHost);
    cy.contains('Собери бургер');
  })

  it('the ingridients have been loaded', () => {
    cy.get(selectors.ingredientsContainer).as("all-ingredients")
    cy.get('@all-ingredients').get(selectors.ingrBun).as('buns')
    cy.get('@all-ingredients').get(selectors.ingrMain).as('mains')
    cy.get('@all-ingredients').get(selectors.ingrSauce).as('sauses')
  })

  it('should show & hide ingredient popup', () => {
    cy.get(selectors.ingredientsContainer).as("all-ingredients")
    cy.get('@all-ingredients').get(selectors.ingrBun).as('buns')
    cy.get('@buns').each((bun) => {
      cy.log("open popup...")
      cy.get(bun).click()
      cy.get(selectors.ingrDetailsName).should('be.visible')
      cy.log("close popup...")
      cy.get(selectors.modalCloseIcon).click()
    })
    cy.get('@all-ingredients').get(selectors.ingrMain).as('mains')
    cy.get('@mains').each((main) => {
      cy.log("open popup...")
      cy.get(main).click()
      cy.get(selectors.ingrDetailsName).should('be.visible')
      cy.log("close popup...")
      cy.get(selectors.modalCloseIcon).click()
    })
    cy.get('@all-ingredients').get(selectors.ingrSauce).as('sauses')
    cy.get('@sauses').each((saus) => {
      cy.log("open popup...")
      cy.get(saus).click()
      cy.get(selectors.ingrDetailsName).should('be.visible')
      cy.log("close popup...")
      cy.get(selectors.modalCloseIcon).click()
    })
  })
  it('dnd', () => {
    const dataTransfer = new DataTransfer()
    cy.get(selectors.ingredientsContainer).as("all-ingredients")
    cy.get(selectors.ingredientsConstructor).as("drop-container")
    cy.get('@all-ingredients').get(selectors.ingrBun).as('buns')
    cy.get('@all-ingredients').get(selectors.ingrMain).as('mains')
    cy.get('@all-ingredients').get(selectors.ingrSauce).as('sauses')
    cy.get('@buns').each((bun) => {
      cy.get(bun).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      
    })
    cy.get('@mains').each((main) => {
      cy.get(main).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      
    })
    cy.get('@sauses').each((saus) => {
      cy.get(saus).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      
    })
  })

  it('create order', () => {
    const dataTransfer = new DataTransfer()
    cy.get(selectors.ingredientsContainer).as("all-ingredients")
    cy.get(selectors.ingredientsConstructor).as("drop-container")
    cy.get('@all-ingredients').get(selectors.ingrBun).first().as('bun')
    cy.get('@all-ingredients').get(selectors.ingrMain).should('have.length.greaterThan', 3).invoke('slice', 0, 3).as('mains')
    cy.get('@all-ingredients').get(selectors.ingrSauce).should('have.length.greaterThan', 3).invoke('slice', 0, 3).as('sauses')

    cy.get('@bun').trigger('dragstart', { dataTransfer })
    cy.get('@drop-container').trigger('drop', { dataTransfer })

    cy.get('@mains').each((main) => {
      cy.get(main).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      
    })
    cy.get('@sauses').each((saus) => {
      cy.get(saus).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      
    })

    cy.get(selectors.createOrderButton).click()
    cy.get('input[name="email"]').type("mikromolekula110@yandex.ru");
    cy.get('input[name="password"]').type("321321");
    cy.get(selectors.logInButton).click();
    cy.get(selectors.mainPage).click()
    cy.get(selectors.createOrderButton).click()
    cy.get(selectors.modalCloseIcon).click()
  })
}); 