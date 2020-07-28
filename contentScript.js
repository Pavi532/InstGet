let init_div = document.createElement('div');
init_div.id = "ini_div"
init_div.className = "extentsion-div";
init_div.innerText = "Fetching.."
// document.getElementsByTagName('header')[0].append(init_div);
setTimeout(() => {
    document.getElementsByClassName('wmtNn')[0].append(init_div);
}, 3000);

let init = setTimeout(()=>{
    chrome.runtime.sendMessage({message: "getId"});
},3500);

chrome.runtime.onMessage.addListener (function (recived, sender, sendResponse) {
    console.log("FROM CS Url:"+recived.message);
    init_div.remove();
    setTimeout(()=>{
        checkMultiples("vi798","Ckrof","KL4Bh");
    },2000);
    
});

function checkMultiples(Class1, Class2, Class3){
    let exists = document.getElementsByClassName(Class1);
    console.log(exists)
    if(exists.length == 1){
        console.log("Multiples exists");
        let exists_li = document.getElementsByClassName(Class2);
        // let exists_video = document.getElementsByClassName("videoSpritePlayButton");
        if(exists_li){
            console.log("Multiple images exists");
            displayDownloadMul(exists_li, Class3);
        }
        else{
            console.log("Just this pic though");
            displayDownloadMul(exists_li, Class3);
        }
    }
    else{
        displayDownloadSing(Class3);
        console.log("Just this one");
    }
}

function displayDownloadSing(Class){
    var ranClass = document.getElementsByClassName(Class);
    console.log(ranClass);
    let child = ranClass[0].childNodes;
    console.log(child);
    let srcSet = child[0].srcset;
    let urlArr = srcSet.split(",");
    let link = urlArr[2].replace(' 1080w','');
    console.log(link);
    let div = document.createElement('div');
    div.className = "row extentsion-div";
    div.innerHTML = `<a target="_blank" href="${link}" download>
                            <button class="down-now" type="button">Download</button>
                        </a>`;
    // document.getElementsByTagName('header')[0].append(div);
    document.getElementsByClassName('wmtNn')[0].append(div);
}



function displayDownloadMul(exists_li, Class){
    let exists_child = [];
    let links = [];
    console.log("Checking for video:");
    for(i=0;i<exists_li.length;i++){
        let vid_ex = exists_li.item(i).getElementsByTagName("video");
        if(vid_ex.length == 0){
            //IF THERE IS NO VIDEO
            // for(i=0;i<exists_li.length;i++){
                
            // }
            exists_child[i] = exists_li[i].getElementsByClassName(Class);
            console.log(exists_child);
            let div_data = exists_child[i].item(0);
            let div_child = div_data.childNodes;
            console.log(div_child.item(0).srcset);
            let urlArr = div_child.item(0).srcset.split(",");
            links[i] = urlArr[2].replace(' 1080w','');
            div_data, div_child, urlArr = null;
        
        }
        vid_ex = null;
    }
    console.log(links);
    //REMOVE EMPTY VALUES FROM LINKS
    temp = [];
    for(let i of links)
        i && temp.push(i); // copy each non-empty value to the 'temp' array
    links = temp;
    console.log(links);

    let div = document.createElement('div');
    div.className = "row extentsion-div";
    let div2 = document.createElement('div');
    div2.className = "div-mini";
    let div3 = document.createElement('div');
    div3.className = "div-mini";
    let label = document.createElement('label');
    label.innerHTML = "Select download:";
    div2.appendChild(label);
        
    for(i=0;i<links.length;i++){
        let a = document.createElement('a');
        a.target = "_blank";
        a.href = links[i];
        let btn = document.createElement('button');
        btn.className = "down-now-mini";
        btn.type = "button"
        btn.innerHTML = i+1;
        a.appendChild(btn);
        div3.appendChild(a);
    }
    div.appendChild(div2);
    div.appendChild(div3);
    // document.getElementsByTagName('header')[0].append(div);
    document.getElementsByClassName('wmtNn')[0].append(div);

}

