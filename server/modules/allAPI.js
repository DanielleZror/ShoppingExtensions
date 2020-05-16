const ebay = require('./ebayAPI.js');
const amazon = require('./amazonAPI.js');
const bestbuy = require('./bestbuyAPI.js');

const apis = [ebay, amazon, bestbuy]

function findTheLowestPrice(keywords) {
    return new Promise((resolve, reject) => {
        let best 
        let promisesArray = []
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
                for (let i = 1; i < products.length; i++) {
                    if (products[i].price < best.price) {
                        best.price = products[i].price
                        best.api = products[i].api
                        best.url = products[i].url
                    }
                }
                resolve(best)
            })
        })
}

module.exports = {findTheLowestPrice}