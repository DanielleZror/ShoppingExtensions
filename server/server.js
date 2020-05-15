var express = require('express');
var app = express();
app.use(express.static('public'));

var data = require('../extensions/data.json')
var allProducts = data["products"];
var allDomains = data["domains"];

 
app.listen(8080, function () {
    console.log("Listening on port " + 8080)
    console.log(data)
});


app.get('/api/CheckProduct', function (req, res) {
    var product = req.query.selectedProduct;
    var domain = req.query.domain;
    var returnValue = false;
    var bestProduct = checkTheBestPrice(product);
    if (bestProduct != getDomain(domain)) {
        returnValue = product[bestProduct]
    }
   res.send(returnValue);
})

getDomain = (domain) => {
    return domain.split(".")[1]
}

checkTheBestPrice =  (product) => {
    var bestPrice =  product[getDomain(allDomains[0])]["price"]
    var bestWeb = allDomains[0].split('.')[1]
    for(var i = 1; i < allDomains.length; i++) {
        var curProductPrice = product[getDomain(allDomains[i])]["price"]
        if (bestPrice > curProductPrice) {
            bestPrice = curProductPrice
            bestWeb = getDomain(allDomains[i])
        }
    }
return bestWeb
    
}






