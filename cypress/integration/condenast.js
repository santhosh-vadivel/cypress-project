/// <reference types="cypress" />
//import * as Homepage from '../support/pageobjects/homepage'

var i,j,homearticle
describe('Sample Project to verify the cntraveler article',()=>{

    before(()=>{
        // hit the API to get the response dynamically and store it in fixture for assertions
        // visit cntraveler website
        cy.request({
            url: Cypress.env('homePageAPI'),
            method: 'GET',
        }).then(res => {
            cy.log(res.body)
            var homepageJSON = res.body
            cy.writeFile('cypress/fixtures/example.json', homepageJSON)
        })//homePageAPI request

        //load the expected response from fixture file and store it to a global variable
        cy.fixture('article').then((homearticlejson)=>{
            homearticle = homearticlejson
        })//fixture

        cy.visit(Cypress.env('applicationURL'))
    })//beforeEach

    //Trying to merge all in one for loop
    //Cypress cross-origin error, as we navigate from "/?us_site=y" while navigating inside an article
    //without '/?us_site=y' in the URL, the following code should work fine

    it('In Conde Nast homepage verify the article', ()=>{
        /*
            Iterate through the first GRID and verify if all the 5 sections have img, tag, heading, description and contributor name
            Verify the data from the UI against the dynamically stored JSON response in article.json file
        */
        for(i = 1; i < 6; i++){
            for(j = i-1; j < i; j++){
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__asset-container img`).scrollIntoView()
                    .should('have.attr','alt',homearticle.bundle.containers[1].items[j].image.altText)
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__content a span`).scrollIntoView()
                    .should('have.text',homearticle.bundle.containers[1].items[j].rubric.name)
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__content > a > h2`).scrollIntoView()
                    .should('have.text',homearticle.bundle.containers[1].items[j].source.hed)
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__content > p`).scrollIntoView()
                    .invoke('text').should('include',homearticle.bundle.containers[1].items[j].source.dek)
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__content span span[data-testid="BylineName"]`).scrollIntoView()
                    .should('have.text',homearticle.bundle.containers[1].items[j].contributors.author.items[0].name)

                // click on each article and verify the mandatory fields in each article
                cy.get(`div:nth-child(2) > div > div > div:nth-child(${i}) div.summary-item__content > a > h2`).scrollIntoView().click()

                // Verify if the articles have the respective mandatory values in it
                cy.get('article > div.lede-background > header figure picture img').should('have.attr','alt',homearticle.bundle.containers[1].items[j].image.altText)
                cy.get('h1[data-testid="ContentHeaderHed"]').should('have.text',homearticle.bundle.containers[1].items[j].dangerousHed)
                //Issue in the CondeNsat text. Data Mismatch in Homepage and article page
                //cy.get('div.lede-background div.content-header__row.content-header__dek').invoke('text').should('contain',homearticle.bundle.containers[1].items[0].source.dek)
                cy.get('div[data-testid="BylinesWrapper"] a.button').should('have.text',homearticle.bundle.containers[1].items[j].contributors.author.items[0].name)
                cy.get('time[data-testid="ContentHeaderPublishDate"]').should('have.text',homearticle.bundle.containers[1].items[j].date)
                cy.get('div.grid--item.body.body__container.article__body.grid-layout__content').should('not.be.empty')
                cy.go('back')
            }//j for
        }// i for
    })//it
})//describe