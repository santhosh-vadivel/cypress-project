// Sample page object file for better maintenance of code
var Homepage = {
    Grid1:{
        Image: 'div:nth-child(2) > div > div > div:nth-child(1) div.summary-item__asset-container img',
        Tag: 'div:nth-child(2) > div > div > div:nth-child(1) div.summary-item__content a span',
        Title: 'div:nth-child(2) > div > div > div:nth-child(1) div.summary-item__content > a > h2',
        Description: 'div:nth-child(2) > div > div > div:nth-child(1) div.summary-item__content > p',
        Contributor: 'div:nth-child(2) > div > div > div:nth-child(1) div.summary-item__content span span[data-testid="BylineName"]'
    }
}
module.exports = Homepage