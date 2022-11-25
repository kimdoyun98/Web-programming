let pageload = localStorage.getItem('page');
let saveObject = JSON.parse(localStorage.getItem('saveObject'));
let saveObjectList = JSON.parse(localStorage.getItem('saveObjectList'));
let objectList = [];

//LocalStorage에 저장 목록 저장
if (saveObjectList == null && saveObject != null){ // 첫 추가
    objectList.push(saveObject);
    localStorage.setItem('saveObjectList', JSON.stringify(objectList));
    localStorage.setItem('page', '0');
}
else if (saveObject != null){ // 여러번 추가
    for (let i = 0; i < saveObjectList.length; i++){
        objectList.push(saveObjectList[i]);
    }
    if (pageload == '1')
        objectList.push(saveObject);
    
    localStorage.setItem('saveObjectList', JSON.stringify(objectList));

    localStorage.setItem('page', '0');
}
else{
    localStorage.setItem('page', '0');
}

// 목록
const section = document.getElementById("index-section");

for(let i = 0; i < objectList.length; i++){
    // div 생성
    let div = document.createElement('div');
    div.className = 'saveContent';
    div.id = i;

    //div 내부 Element 생성
    let span = document.createElement('span');
    let p_tag = document.createElement('p');
    let span_title = document.createTextNode(objectList[i].title);
    
    let text = objectList[i].content.split('<br>');
    let p_content = document.createTextNode(text[0]);

    span.appendChild(span_title);
    p_tag.appendChild(p_content);

    div.appendChild(span);
    div.appendChild(p_tag);

    section.appendChild(div);
}

// 선택한 목록에 해당하는 정보와 함께 상세 페이지로 전환
let listBtn = document.querySelectorAll(".saveContent");
listBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        localStorage.setItem('readObject', JSON.stringify(objectList[btn.id]));
        location.href='read.html';
    });
});
