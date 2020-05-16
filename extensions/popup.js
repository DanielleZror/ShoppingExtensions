console.log("helle")

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        document.getElementById("title").innerHTML  = `we found that product in at better price- ${message.price} in ${message.site}: `
        document.getElementById("link").href =  message.url
    }
);