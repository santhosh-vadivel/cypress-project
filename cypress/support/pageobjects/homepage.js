// Sample page object file for better maintenance of code
var Amazon = {
    HomePage:{
        SearchInputField: '#twotabsearchtextbox',
        SearchIcon: '#nav-search-submit-button',
        ItemList: 'div.s-main-slot.s-result-list.s-search-results.sg-row > div[data-component-type]',
    },
    ProductPage:{
        Title: '#productTitle',
        Availability: '#availability > span',
        Quantity: '#quantity',
        Price: 'div[id="buyNewSection"] span',
        AddToCart: '#add-to-cart-button',
        Continue: 'input[type=image]:nth-child(6)'
    },
    CartInfo:{
        SuccessMessage: '#huc-v2-order-row-confirm-text > h1',
        ProceedToBuy: '#hlb-ptc-btn-native'
    }
}
module.exports = Amazon