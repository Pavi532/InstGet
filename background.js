
setTimeout(() => {

    chrome.runtime.onMessage.addListener((recived,sender,sendResponse)=>{
        if(recived.message == "getId"){
            console.log("Message recived");
            let url_init = "";
            setInterval(() => {
                chrome.tabs.query({active: true, currentWindow: true, url: "https://www.instagram.com/p/*" }, (Tab) =>{
                    let tabId = Tab[0].id;
                    let url = Tab[0].url;
                    var comp = url_init.localeCompare(url);
                    console.log("Message recived");
                    if ( comp != 0){
                        chrome.tabs.sendMessage(Tab[0].id,{message: url});
                        console.log("FROM BG Tab Id:"+tabId+" url:"+url);
                        url_init = url;
                        console.log("New url_ini:"+url_init);
                    }
                });
            },3000);
        }
        else {
            console.log("Did not receive the response!!!");
        }
    });
    
    
}, 2000);

window.addEventListener('popstate', function (event) {
    alert("URL Changed"+event.state);
});

