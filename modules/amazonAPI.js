const data = require('../extensions/data.json')
const products = data["products"]

function getProduct(keywords) {
    return new Promise((resolve, reject) => {
        products.forEach(product => {
            if(product.keywords.join() == keywords.join()){
                product.sites.forEach(site => {
                    if(site.api == "amazon"){
                        resolve(site)
                    }
                })
            }
        })
    })
}

module.exports = {getProduct}