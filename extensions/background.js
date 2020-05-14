//import apiCheckWeb from '../api.js';
var domains;
fetch('data.json')
.then(res => res.json())
.then(data => {
    domains = data["domains"]
    console.log(domains)
    chrome.tabs.onUpdated.addListener(callback);
})



 callback = (tab_Id, changeInfo, tab) => {
    console.log("tabid", tab_Id, "change",  changeInfo,"tab", tab)    
    if(changeInfo.status == "complete"){
        var domainUrl = new URL(tab.url)
        if (domains.indexOf(domainUrl.host)!= -1){
            apiCheckProduct(tab.title,domainUrl.host, popupExtension)    
        }
    }
}



chrome.tabs.onUpdated.addListener(callback);

apiCheckProduct = (title, domain, callback)  => {
    sendTitle = {"title": title, "domain": domain}
    if(jQuery){
        jQuery.get("http://localhost:8080/api/CheckProduct", sendTitle , function (data) {
            if (data) {
                callback()
            }
    })}
}

popupExtension = () => {
    window.open(
        chrome.extension.getURL("popup.html"),
        "exampleName",
        "width=400,height=400"
    );
}
    
checkDomain = (url) => {
    var domainUrl = new URL(url)
    return (domains.indexOf(domainUrl.host)!= -1)
}