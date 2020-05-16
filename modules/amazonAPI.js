var data = require('../extensions/data.json')
var products = data["products"]

var getProduct = function(keywords) {
    return new Promise(function(resolve, reject){
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