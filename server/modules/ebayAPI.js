const https= require('https');
   
function getProduct(keywords) {
    return new Promise((resolve, reject) => {
        keywords = keywords.join(" ")
        let url = buildURL(keywords)
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
                    price: parseInt(dataJson["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["sellingStatus"][0]["currentPrice"][0]["__value__"]),
                    url: dataJson["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["viewItemURL"][0]
                }
                resolve(ebayProduct)
            });
        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    })
}

function buildURL (keywords) {
    let url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=BuIL-ILBUTEST-PRD-08df3d054-456c1a75";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += `&keywords=${keywords}`;
    url += "&paginationInput.entriesPerPage=1";

    return url
}

module.exports = {getProduct}