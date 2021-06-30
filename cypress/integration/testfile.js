/// <reference types="cypress" />

const Amazon = require("../support/pageobjects/homepage")
import * as commands from '../support/commands'
let itemlistlength;

const inputObj = {
    BookName: 'Ruskin Bond - Tales from the Childhood',
    Availability: 'In stock.',
    Quantity: '1',
    Price: '105.00',
    SuccessMessage: 'Added to Cart'
};

describe('Sample Project to verify cart in Amazon',()=>{
    // hit the cntraveler API to get the response dynamically and store it in fixture for assertions
    before(()=>{
        cy.visit(Cypress.env('applicationURL'))
    })//before

    it('search and select a product in amazon', ()=>{
        cy.get(Amazon.HomePage.SearchInputField,{timeout:10000}).type(inputObj.BookName);
        cy.get(Amazon.HomePage.SearchIcon,{timeout:5000}).click()

        cy.get(Amazon.HomePage.ItemList).then(($itemlist)=>{
            itemlistlength = $itemlist.length
            //verify the list should not be empty
            expect(itemlistlength).to.be.greaterThan(0)
        })
        
        //click on the first element
        cy.get(Amazon.HomePage.ItemList).first().find('a').first().invoke('removeAttr','target').click()
    })//it

    it('Verify the product details in cart', ()=>{
        cy.get(Amazon.ProductPage.Title,{timeout:10000}).should('contain.text',inputObj.BookName)
        
        commands.compareText(Amazon.ProductPage.Availability,inputObj.Availability)
        cy.get(Amazon.ProductPage.Quantity).select('1').should('have.value',inputObj.Quantity)
        cy.get(Amazon.ProductPage.Price).should('contain',inputObj.Price)
    })//it

    it('Add the product to Cart', ()=>{
        cy.get(Amazon.ProductPage.AddToCart,{timeout:10000}).click()
        
        commands.compareText(Amazon.CartInfo.SuccessMessage,inputObj.SuccessMessage)
        cy.get(Amazon.CartInfo.ProceedToBuy,{timeout:10000}).should('contain','1 item')
        //cy.get(Amazon.ProductPage.Continue,{timeout:10000}).click()
    })//it
})//describe