var express = require('express');
var app = express();
app.use(express.static('public'));
var ebay = require('../modules/ebayAPI.js');
var data = require('../extensions/data.json')
var notHaveApi = data["nothaveapi"];

 
app.listen(8080, function () {
    console.log("Listening on port " + 8080)
    console.log(data)
});


app.get('/api/CheckProduct', function (req, res) {
    var product = req.query.selectedProduct;
    var domain = req.query.domain;
    var returnValue = false;
    getTheBestProduct(product, findTheBestPrice).then((value) => {
        var bestProduct = value
        if (bestProduct != domain) {
            returnValue = product[bestProduct]
        }
        res.send(returnValue);
    }) 
})

findTheBestPrice = (product, ebay, ebayPrice) => {
    var bestWeb = ebay
    var bestPrice = ebayPrice
        for(var i = 0; i < notHaveApi.length; i++) {
            var curProductPrice = product[notHaveApi[i]]["price"]
            if (parseInt(bestPrice) > parseInt(curProductPrice)) {
                bestPrice = curProductPrice
                bestWeb = notHaveApi[i]
            }
    }
    return bestWeb 
}


var getTheBestProduct = (product, findTheBestPrice) => {
    return new Promise(function(resolve, reject){
        ebay.getEbayProduct(product["product"])
        .then((ebayProduct) => {
            resolve(findTheBestPrice(product,"ebay", ebayProduct["ebay"]["price"]))
        })   
    })        
}






