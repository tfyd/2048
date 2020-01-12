var board = new Array();
var score = -1;

$(document).ready(function(){
    newGame();
});

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
                nc.css('top', getPosTop(i,j) + 50);
                nc.css('left', getPosLeft(i,j) + 50);
            } else {
                nc.css('width', '100px');
                nc.css('height', '100px');
                nc.css('top', getPosTop(i,j));
                nc.css('left', getPosLeft(i,j));                
                nc.css('background-color', getNumBgColor( board[i][j]));
                nc.css('color', getNumColor(board[i][j]));
                nc.text(yd[board[i][j]]);
            }
        }
    }
    score++;
    $("#score").text(score);
}

function generateOneNum() {
    if (noSpace( board ))
        return false;
    
    // generate random position
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));       
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
                generateOneNum();
                isOver();
            };
            break;
        case 38: // up
            if (moveU()) {
                generateOneNum();
                isOver();
            };
            break;
        case 39: // right
            if (moveR()) {
                generateOneNum();
                isOver(); 
            };
            break;
        case 40: // down
            if (moveD()) {
                generateOneNum();
                isOver();   
            };
            break;
        default:
            break;
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

