const express = require('express');
const APIS = require('./modules/allAPI.js');
const app = express();
app.use(express.static('public'));
 
app.listen(8080, () => {
    console.log("Listening on port " + 8080)
});


app.get('/api/CheckProduct', (req, res) => {
    let product = req.query.selectedProduct;
    let domain = req.query.domain;
    let returnValue = false;
    getTheBestProduct(product)
        .then((bestProduct) => {
            if (bestProduct.api != domain) {
                returnValue = bestProduct
            }
            res.send(returnValue);
        }) 
})


function getTheBestProduct(product) {
    return new Promise((resolve, reject) => {
        APIS.findTheLowestPrice(product.keywords)
            .then((bestProduct) => {
                resolve (bestProduct)
            })   
    })        
}






