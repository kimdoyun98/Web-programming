const readData = JSON.parse(localStorage.getItem('readObject')),
      title_span = document.querySelector('.read-header span'),
      content_p = document.getElementById('content'),
      canvasImg = document.getElementById('canvasImg');

function goBack(){
    window.history.back();
}

// 제목
let title = document.createTextNode(readData.title);
title_span.appendChild(title);

// 내용

let text = readData.content.split('<br>');

content_p.style.fontFamily = readData.content_fontFamily;
content_p.style.fontSize = readData.content_fontSize;
content_p.style.fontWeight = readData.content_fontWeight;
content_p.style.color = readData.content_fontColor;

for(let i = 0; i < text.length; i++){
    let content = document.createTextNode(text[i]);
    let br = document.createElement('br');
    
    content_p.appendChild(content);
    content_p.appendChild(br);
}

// 이미지
canvasImg.src = readData.canvasUrl;