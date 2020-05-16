var domains;
var products;
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        domains = data["domains"]
        products = data["products"]
        chrome.tabs.onUpdated.addListener(onUpdate);
    })

function onUpdate(tab_Id, changeInfo, tab) {
    if(changeInfo.status == "complete"){
        let selectedUrl = isDomainValid(tab.url)
        let selectedProduct = isProductValid(tab.title)
        if ((selectedUrl) && (selectedProduct)){
            checkForBetterProduct(selectedProduct, selectedUrl, popupExtension)    
        }
    }
}

function isDomainValid(url){
    let domainUrl = new URL(url)
    returnValue = false
    domains.forEach(domain => {
        if(domainUrl.host.includes(domain) && isViewOrSearch(url, domain)){
            returnValue = domain
        }
    })
    return (returnValue)
}

function isViewOrSearch(url, host){
    let viewUrl = false
    switch(host) {
        case("ebay"):
            if(url.includes("/itm/")){
                viewUrl = true
            }
            break;
        case("amazon"):
            if(!url.includes("/s?")){
                viewUrl = true
            }
            break;
        case("bestbuy"):
            if(!url.includes("/searchpage")){
                viewUrl = true
            }
            break;
    }
    return viewUrl
}

function isProductValid(title){
    let returnValue = false;
    products.forEach(product => {
        let regTitle = new RegExp(`.*${product.keywords.join(".*")}.*`, "i")
        if (title.match(regTitle) != null){
            returnValue = product
        }
    });
    return returnValue
}

function checkForBetterProduct(selectedProduct, domain, callback){
    sendProduct = {"selectedProduct": JSON.stringify(selectedProduct), "domain": domain}
    fetch("http://localhost:8080/api/CheckProduct?" + new URLSearchParams(sendProduct))
        .then(res => res.json())
        .then(data => {
            if(data){
                callback(data)
            }
        })
}

function popupExtension(data){
    win = window.open(
        chrome.extension.getURL("popup.html"),
        "exampleName",
        "width=400,height=400"
    );
    win.addEventListener('load', () => {
        chrome.runtime.sendMessage({price: data.price, url: data.url, site: data.api})
    }, true); 
}
