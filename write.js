function goBack(){
    window.history.back();
}

let textArea = document.getElementById("textarea");

function changeFontFamily() {
    let fontfamily = document.getElementById("font-family").value;
    textArea.style.fontFamily = fontfamily;
  }

function changeFontSize(){
    let fontSize = document.getElementById("font-size").value;
    textArea.style.fontSize = fontSize+"px";
}

function onClickTextStyle(){
    let textStyle = document.getElementById("text-font-style");
    if(textStyle.value == 0){
        textStyle.value = 1;
        textStyle.style.color = 'blue';
        textArea.style.fontWeight = 'bold';
    }
    else if(textStyle.value == 1){
        textStyle.value = 0;
        textStyle.style.color = 'black';
        textArea.style.fontWeight = 'normal';
    }
}

function changeFontColor(){
    let fontColorValue = document.getElementById("text-font-color").value;
    textArea.style.color = fontColorValue;
}







// CANVAS
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillcolor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#canvas-size-slider"),
    canvasColor = document.getElementById("canvas-color"),
    canvasEraser = document.getElementById("eraser"),
    canvasEraserAll = document.getElementById("eraser-all"),
    context = canvas.getContext("2d"),
    textArea_div = document.getElementById("textarea-div"),
    drawingBoard = document.getElementById("drawing-board");

const saveImg = document.querySelector("#save");

let prevMouseX,
    prevMouseY,
    snapshot,
    isDrawing = false,
    selectedTool = "text",
    brushWidth = 5,
    selectedColor = "#000"; // black


// 툴 버튼 클릭 이벤트
toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".options .active").classList.remove("active");
      btn.classList.add("active");
      selectedTool = btn.id;
      console.log(selectedTool);

      if (selectedTool != "text") {
        textArea.disabled = true;
        textArea_div.style.zIndex = 1;
        drawingBoard.style.zIndex = 2;

        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mousemove", drawing);
        canvas.addEventListener("mouseup", () => (isDrawing = false));

      }
      else {
        textArea.disabled = false;
        textArea_div.style.zIndex = 2;
        drawingBoard.style.zIndex = 1;

        canvas.removeEventListener("mousedown", startDraw);
        canvas.removeEventListener("mousemove", drawing);
        canvas.removeEventListener("mouseup", () => (isDrawing = false));

    }
    });
});

  
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// Canvas 색 변경
function changeConvasPenColor(){
    selectedColor = canvasColor.value;
}

// 전체 지우기
function onClickCanvasEraserAll(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // textArea_div.style.paddingTop = 0;
    // drawingBoard.style.height = 65+"%";
}

// 굵기 이벤트
sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));


// 사각형
const drawRect = (e) => {
    if (!fillcolor.checked) {
      return context.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      );
    }
    context.fillRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  };
  
  //원
  const drawCircle = (e) => {
    context.beginPath();
    let radius = Math.sqrt(
      Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
    );
    context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillcolor.checked ? context.fill() : context.stroke();
  };
  
  //삼각형
  const drawTriangle = (e) => {
    context.beginPath();
    context.moveTo(prevMouseX, prevMouseY);
    context.lineTo(e.offsetX, e.offsetY);
    context.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    context.closePath();
    fillcolor.checked ? context.fill() : context.stroke();
  };
  
  // 마우스 이벤트
  const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    context.beginPath();
    context.lineWidth = brushWidth;
    context.strokeStyle = selectedColor;
    context.fillStyle = selectedColor;
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
  };
  
  const drawing = (e) => {
    context.lineJoin = "round";
    context.lineCap = "round";

    if (!isDrawing) return;
    context.putImageData(snapshot, 0, 0);
  
    if (selectedTool == "brush" || selectedTool === "eraser") {
        context.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        context.lineTo(e.offsetX, e.offsetY); // 마우스 포인터따라 그리기
        context.stroke(); // 그리기 선 색
    } else if (selectedTool === "rectangle") {
      drawRect(e);
    } else if (selectedTool === "circle") {
      drawCircle(e);
    } else {
      drawTriangle(e);
    }
  };


// 캔버스 이미지 저장
saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = Date.now + ".jpg"; // 파일명
    link.href = canvas.toDataURL();
    link.click();
});

// 이미지 불러오기
function loadFile(input) {
    var file = input.files[0];	//선택된 파일 가져오기

    let img = new Image();
    img.src = URL.createObjectURL(file);  

    img.onload = function (){
        context.drawImage(img, 200, 10, canvas.width - 400, 150);
    }

    // textArea_div.style.paddingTop = 300 +"px";
    // drawingBoard.style.height = 105+"%";
};
