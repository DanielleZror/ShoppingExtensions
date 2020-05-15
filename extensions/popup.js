console.log("helle")

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log("price" , message.price);
        console.log("url" , message.url);
        document.getElementById("title").innerHTML  = `we found that product in a better price of- ${message.price} in: `
        document.getElementById("link").href =  message.url
    }
);