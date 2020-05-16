const https= require('https');

var url = "https://svcs.ebay.com/services/search/FindingService/v1";
  

    function buildURL (keywords) {
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=BuIL-ILBUTEST-PRD-08df3d054-456c1a75";
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&REST-PAYLOAD";
        url += `&keywords=${keywords}`;
        url += "&paginationInput.entriesPerPage=1";
    }

    
    var getProduct = function(keywords) {
        return new Promise(function(resolve, reject){
            keywords = keywords.join(" ")
            buildURL(keywords)
            https.get(url, (resp) => {
                let data = '';
                var dataJson;
                var ebayProduct;

                resp.on('data', (chunk) => {
                    data += chunk;
                });

               resp.on('end', () => {
                    dataJson = JSON.parse(data);
                    ebayProduct = {
                        api: "ebay",
                        price: dataJson["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["sellingStatus"][0]["currentPrice"][0]["__value__"],
                        url: dataJson["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["viewItemURL"][0]
                    }
                    resolve(ebayProduct)
                });

                }).on("error", (err) => {
                    reject("Error: " + err.message);
                });
            })
    }
    
    module.exports = {getProduct}