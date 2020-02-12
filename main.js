var board = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function(){
    prepareMobile();
    newGame();
});

function prepareMobile() {
    if(documentWidth > 500){
        containerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
        console.log("not mobile!");
    }

    $('#grid-container').css('width', containerWidth - 2*cellSpace);
    $('#grid-container').css('height', containerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02*containerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02*cellSideLength);
}

function newGame(){
    // Initialise grid
    console.log("inside newgame");
    init();
    // create two number randomly
    generateOneNum();
    generateOneNum();
}

function init() {
    for(var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            console.log("gridCell = " + gridCell);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i ++){
        board[i] = new Array();
        for (var j = 0; j < 4; j ++)
            board[i][j] = 0;
    }
    score = 0;
    updateBoardView();

}

function updateBoardView() {
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var newdiv = '<div class = "number-cell" id = "number-cell-' + i + '-' + j + '"></div>';
            $("#grid-container").append(newdiv);
            var nc = $('#number-cell-' + i + "-" + j);
            if(board[i][j] == 0) {
                nc.css('width', '0px');
                nc.css('height', '0px');
                nc.css('top', getPosTop(i,j) + cellSideLength/2);
                nc.css('left', getPosLeft(i,j) + cellSideLength/2);
            } else {
                nc.css('width', cellSideLength);
                nc.css('height', cellSideLength);
                nc.css('top', getPosTop(i,j));
                nc.css('left', getPosLeft(i,j));                
                nc.css('background-color', getNumBgColor( board[i][j]));
                nc.css('color', getNumColor(board[i][j]));
                nc.text(wkx[board[i][j]]);
            }
        }
    }
    $(".number-cell").css('line-height', cellSideLength + 'px');
    $(".number-cell").css('font-size', 0.3*cellSideLength + 'px');
    $('.number-cell').css('border-radius', 0.02*cellSideLength);
    $("#score").text(score);
}

function generateOneNum() {
    if (noSpace( board ))
        return false;
    
    // generate random position
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));       
        times++;
    }

    if(times == 50) {
        for(var i = 0; i < 4; i++)
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                    break;
                }
            }
    }
    
    // generate random number
    var randn = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randn;
    showNum(randx, randy, randn);
    return true;
}

$(document).keydown( function ( event ) {
    event.preventDefault();
    switch(event.keyCode){
        case 37: // left
            if (moveL()) {
                setTimeout("generateOneNum()", 210);
                isOver();
            };
            break;
        case 38: // up
            if (moveU()) {
                setTimeout("generateOneNum()", 210);
                isOver();
            };
            break;
        case 39: // right
            if (moveR()) {
                setTimeout("generateOneNum()", 210);
                isOver(); 
            };
            break;
        case 40: // down
            if (moveD()) {
                setTimeout("generateOneNum()", 210);
                isOver();   
            };
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart', function ( event ) {
    startx = event.touches[0].pageX; 
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function ( event ) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
        console.log("click");
        return;
    }
    console.log("move");

    if(Math.abs(deltax)>=Math.abs(deltay)){
        // right
        if(deltax > 0) {
            if (moveR()) {
                setTimeout("generateOneNum()", 210);
                isOver(); 
            };
        // left
        }else{
            if (moveL()) {
                setTimeout("generateOneNum()", 210);
                isOver();
            };
        }
    }else{
        // down
        if(deltay > 0) {
            if (moveD()) {
                setTimeout("generateOneNum()", 210);
                isOver();   
            };
        // up
        }else {
            if (moveU()) {
                setTimeout("generateOneNum()", 210);
                isOver();
            };
        }
    }
});

function moveL() {
    if(!canMoveL(board)){
        return false;
    }
    for (var i = 0; i < 4; i++){
        for (var j = 1; j < 4; j++){
            if(board[i][j] != 0) {
                for (var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockH(i, k, j, board)) {
                        // move
                        showMove(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockH(i, k, j, board)) {
                        // move
                        showMove(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        continue;
                    } 
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveR() {
    if(!canMoveR(board)){
        return false;
    }
    for (var i = 0; i < 4; i++){
        for (var j = 2; j >= 0; j--){
            if(board[i][j] != 0) {
                for (var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockH(i, j, k, board)) {
                        // move
                        showMove(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockH(i, j, k, board)) {
                        // move
                        showMove(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        continue;
                    } 
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;    
}

function moveU() {
    if(!canMoveU(board)){
        return false;
    }
    for (var i = 1; i < 4; i++){
        for (var j = 0; j < 4; j++){
            if(board[i][j] != 0) {
                for (var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockV(j, k, i, board)) {
                        // move
                        showMove(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockV(j,k,i, board)) {
                        // move
                        showMove(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        continue;
                    } 
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;    
}

function moveD() {
    if(!canMoveD(board)){
        return false;
    }
    for (var i = 2; i >= 0; i--){
        for (var j = 0; j < 4; j++){
            if(board[i][j] != 0) {
                for (var k = 3; k > i ; k--){
                    if(board[k][j] == 0 && noBlockV(j,i, k, board)) {
                        // move
                        showMove(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockH(i, j, k, board)) {
                        // move
                        showMove(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        continue;
                    } 
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;    
}

function isOver(){
    return true;
}

