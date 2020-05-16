var ebay = require('./ebayAPI.js');
var amazon = require('./amazonAPI.js');
var bestbuy = require('./bestbuyAPI.js');

var apis = [ebay, amazon, bestbuy]

var findTheLowestPrice = function(keywords){
    return new Promise(function(resolve, reject){
        var best 
        var promisesArray = []
        apis.forEach(api => {
            promisesArray.push(api.getProduct(keywords))
        })

        Promise.all(promisesArray)
            .then((products) => {
                best = {
                    api: products[0].api,
                    price: products[0].price,
                    url: products[0].url
                }
                for(var i = 1; i < products.length; i++){
                    if (parseInt(products[i].price) < parseInt(best.price)){
                        best.price = products[i].price
                        best.api = products[i].api
                        best.url = products[i].url
                    }
                }
                resolve (best)
            })
        })
}

module.exports = {findTheLowestPrice}