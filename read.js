const readData = JSON.parse(localStorage.getItem('readObject')),
      title_span = document.querySelector('.read-header span'),
      content_p = document.getElementById('content');

function goBack(){
    window.history.back();
}

// 제목
let title = document.createTextNode(readData.title);
title_span.appendChild(title);

// 내용
let content = document.createTextNode(readData.content);
content_p.style.fontFamily = readData.content_fontFamily;
content_p.style.fontSize = readData.content_fontSize;
content_p.style.fontWeight = readData.content_fontWeight;
content_p.style.color = readData.content_fontColor;

content_p.appendChild(content);
