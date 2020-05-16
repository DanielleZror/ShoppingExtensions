var domains;
var products;
fetch('data.json')
.then(res => res.json())
.then(data => {
    domains = data["domains"]
    products = data["products"]
    chrome.tabs.onUpdated.addListener(callback);
})



 callback = (tab_Id, changeInfo, tab) => {  
    if(changeInfo.status == "complete"){
        var selectedUrl = isCheckedDomain(tab.url)
        var selectedProduct = isCheckedProduct(tab.title)
        if ((selectedUrl) && (selectedProduct)){
            apiFindBetterProduct(selectedProduct, selectedUrl, popupExtension)    
        }
    }
}

isCheckedDomain = (url) => {
    var domainUrl = new URL(url)
    returnValue = false
    domains.forEach(domain => {
        if(domainUrl.host.includes(domain)){
            if (isViewOrSearch(url, domain)){
                returnValue = domain
            }
        }
    })
    return (returnValue)
}

isViewOrSearch = (url, host) => {
    var viewUrl = false
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

isCheckedProduct = (title) => {
    var returnValue = false;
    products.forEach(product => {
        var regTitle = new RegExp(".*".concat(product.keywords.join(".*").concat(".*")), "i")
        if (title.match(regTitle) != null){
            returnValue = product
        }
    });
    return returnValue
}

apiFindBetterProduct = (selectedProduct, domain, callback)  => {
    sendProduct = {"selectedProduct": selectedProduct, "domain": domain}
    if(jQuery){
        jQuery.get("http://localhost:8080/api/CheckProduct", sendProduct , function (data) {
            if (data) {
                callback(data)
            }
    })}
}

popupExtension = (data) => {
    win = window.open(
        chrome.extension.getURL("popup.html"),
        "exampleName",
        "width=400,height=400"
    );
    win.addEventListener('load', function() {
        chrome.runtime.sendMessage({price: data.price, url: data.url, site: data.api})
    }, true); 
}
    
checkDomain = (url) => {
    var domainUrl = new URL(url)
    return (domains.indexOf(domainUrl.host)!= -1)
}