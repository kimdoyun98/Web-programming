const readData = JSON.parse(localStorage.getItem('readObject')),
      title_span = document.querySelector('.read-header span'),
      content_sp = document.getElementById('content'),
      canvasImg = document.getElementById('canvasImg'),
      content_div = document.getElementById('content-div');

function goBack(){
    window.history.back();
}

// 제목
let title = document.createTextNode(readData.title);
title_span.appendChild(title);

// 내용

let text = readData.content.split('<br>');

content_sp.style.fontFamily = readData.content_fontFamily;
content_sp.style.fontSize = readData.content_fontSize;
content_sp.style.fontWeight = readData.content_fontWeight;
content_sp.style.color = readData.content_fontColor;

for(let i = 0; i < text.length; i++){
    let content = document.createTextNode(text[i]);
    let br = document.createElement('br');
    
    content_sp.appendChild(content);
    content_sp.appendChild(br);
}

// 이미지
var newImage = document.createElement("img");
newImage.id = 'canvasImg';
newImage.src = readData.canvasUrl;

var container = document.getElementById('canvasImg');
container.appendChild(newImage);

console.log(readData.uploadImg);

if (readData.uploadImg == true){
    console.log("uploadImg == true");
    content_div.style.paddingTop = 200 +"px";
}