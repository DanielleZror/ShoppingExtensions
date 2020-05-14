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
    var title = req.query.title;
    var domain = req.query.domain;
    var returnValue = false;
    var bestProduct
    for (var i = 0; i < allProducts.length; i++) {
        if (title.match(new RegExp(allProducts[i]["product"], "i")) != null){
            bestProduct = checkTheBestPrice(allProducts[i])
            if (allProducts[i][bestProduct] != domain.split(".")[1]) {
                returnValue = allProducts[i][bestProduct]
            }
        }
    }
   res.send(returnValue);
})


checkTheBestPrice =  (product) => {
    var bestPrice =  product[allDomains[0].split('.')[1]]["price"]
    var bestWeb = allDomains[0].split('.')[1]
    for(var i = 1; i < allDomains.length; i++) {
        var curProductPrice = product[allDomains[i].split('.')[1]]["price"]
        if (bestPrice > curProductPrice) {
            bestPrice = curProductPrice
            bestWeb = allDomains[i].split('.')[1]
        }
    }
return [bestWeb]
    
}






