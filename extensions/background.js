
function callback (tab_Id, changeInfo, tab) {
url = tab.url

    if(url.includes("amazon.com") && changeInfo.status == "complete"){
        console.log("amazonnnn")
         window.open(
            chrome.extension.getURL("popup.html"),
            "exampleName",
            "width=400,height=400"
        );
       // window.close();
      
    }
    console.log("tabid", tab_Id, "change",  changeInfo,"tab", tab)
}

// $.get("api/all", user_id , function (data) {
//     allCards(data)
// })


chrome.tabs.onUpdated.addListener(callback);