let textArea = document.getElementById("textarea");

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
let canvasPen = document.getElementById("canvas-pen");
let canvas, context;
let textarea_div = document.getElementById("textarea-div");
let canvas_div = document.getElementById("canvas-div");
const canvasThickness = document.getElementById("canvas-thickness");
const canvasEraser = document.getElementById("eraser");
const canvasEraserAll = document.getElementById("eraser-all");

function init(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    context.lineWidth = 2;
    context.strokeStyle = 'black';

    // const { width, height } = canvas.getBoundingClientRect();
    canvas.width = 1228;
    canvas.height = 500;
}

function onClickCanvasPen(){
    if(canvasPen.value == 0){
        canvasPen.value = 1;
        canvasEraser.value = 0;
        canvasPen.style.color = 'blue';
        canvasEraser.style.color = 'black';
        textArea.disabled = true;
        textarea_div.style.zIndex = 1;
        canvas_div.style.zIndex = 2;

        SHAPE_BUTTON.forEach( shape => {
            shape.value = 0;
            shape.style.boxShadow = "";
        });

        if(canvas){
            canvas.addEventListener("mousedown", down, false);
            canvas.addEventListener("mouseup", up, false);
            canvas.addEventListener("mousemove", move, false);
            canvas.addEventListener("mouseout", out, false);
        }
    }
    else if(canvasPen.value == 1){
        canvasPen.value = 0;
        canvasPen.style.color = 'black';
        textArea.disabled = false;
        textarea_div.style.zIndex = 2;
        canvas_div.style.zIndex = 1;

        if(canvas){
            canvas.removeEventListener("mousedown", down, false);
            canvas.removeEventListener("mouseup", up, false);
            canvas.removeEventListener("mousemove", move, false);
            canvas.removeEventListener("mouseout", out, false);
        }
    }
}

function onClickCanvasEraser(){
    canvasEraser.value = 1;
    canvasPen.value = 0;
    canvasEraser.style.color = 'blue';
    canvasPen.style.color = 'black';

    SHAPE_BUTTON.forEach( shape => {
        shape.value = 0;
        shape.style.boxShadow = "";
    });
}

function changeConvasPenColor(){
    let canvasColor = document.getElementById("canvas-color");
    context.strokeStyle = canvasColor.value;
}

function onClickCanvasEraserAll(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}


let startX = 0, startY = 0;
let dragging = false;

function move(e){
    if(!dragging) return;

    var curX = e.offsetX;
    var curY = e.offsetY;

    if (canvasPen.value == 1) {
        draw(curX, curY);
    }
    if(canvasEraser.value == 1) {
        if(dragging){
            context.clearRect(curX-context.lineWidth/2, curY-context.lineWidth/2, context.lineWidth, context.lineWidth);
        }
    }
    if(circle.value == 1){

    }
    else if(triangle.value == 1){

    }
    else if(square.value == 1){
        //canvasDraw();
    }
    startX = curX;
    startY = curY;

    // stX = curX;
    // stY = curY;
}

function down(e){
    startX = e.offsetX;
    startY = e.offsetY;
    // stX = e. offsetX ; 
    // stY = e. offsetY ; 
    dragging = true;
}
function up(e) {
    // endX = e.offsetX
    // endY = e.offsetY
    dragging = false;
}

function out(e) { dragging = false; }

function draw(curX, curY){
    context.lineJoin = "round";
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(curX, curY);
    context.stroke();
}

function handleRangeChange(event) {
    const size = event.target.value;
    context.lineWidth = size;
    canvasThickness.value = size;
}
canvasThickness.addEventListener("input", handleRangeChange);

// SHAPE
let circle = document.getElementById("circle-button");
let triangle = document.getElementById("triangle-button");
let square = document.getElementById("square-button");
let SHAPE_BUTTON = [square, triangle, circle];

function onClickShape(event){
    let shape = event.target;

    for(i = 0 ; i < SHAPE_BUTTON.length ; i++){
        let button = SHAPE_BUTTON[i];
        if(button.name == shape.name){
            if(button.value == 0){
                button.value = 1;
                button.style.boxShadow = "1px 1px 3px 1px #dadce0";
                canvasEraser.value = 0;
                canvasPen.value = 0;
                canvasEraser.style.color = 'black';
                canvasPen.style.color = 'black';
                
            }
            else if(button.value == 1){
                button.value = 0;
                button.style.boxShadow = "";
            }
        }
        else {
            button.style.boxShadow = "";
        }
    }
}
SHAPE_BUTTON.forEach( shape => shape.addEventListener("click", onClickShape));

// function canvasDraw()
// {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height) //설정된 영역만큼 캔버스에서 지움
//     context.strokeRect(startX,startY,currentX-startX,currentY-startY) //시작점과 끝점의 좌표 정보로 사각형을 그려준다.
// }