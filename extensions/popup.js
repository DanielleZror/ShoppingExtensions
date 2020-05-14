console.log("helle")

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log("price" , message.price);
        console.log("url" , message.url);
        document.getElementById("title").innerHTML  = `find better product in ${message.domain} price- ${message.price}`
        
        
    }
);