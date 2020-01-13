documentWidth = window.screen.availWidth;
containerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop(i,j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(i,j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumBgColor( number ) {
    switch( number ){
        case 2: return "#E8F6F3"; break;
        case 4: return "#D1F2EB"; break;
        case 8: return "#A3E4D7"; break;
        case 16:return "#76D7C4"; break;
        case 32: return "#48C9B0"; break;
        case 64:return "#1ABC9C";break;
        case 128:return "#17A589";break;
        case 256:return "#148F77";break;
        case 512:return "#117864";break;
        case 1024:return "#0E6251";break;
        case 2048:return "#117A65";break;
        case 4096:return "#0E6655";break;
        case 8192:return "#0B5345";break;
    }
}

function getNumColor( number ) {
    if (number < 128)
        return "#6b473c";
    return "white";
}

function noSpace( board ) {
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            if(board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveL( board ){
    for (var i = 0; i < 4; i++){
        for (var j = 1; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveR( board ){
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 3; j++){
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveU( board ){
    for (var i = 1; i < 4; i++){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveD( board ){
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockH (row, col1, col2, board) {
    for(var i = col1+1; i < col2; i++){
        if (board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function noBlockV (col, row1, row2, board) {
    for(var i = row1+1; i < row2; i++){
        if (board[i][col] != 0){
            return false;
        }
    }
    return true;
}