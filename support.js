console.log("load support");

function getPosTop(i,j) {
    return 20 + i * 120;
}

function getPosLeft(i,j) {
    return 20 + j * 120;
}

function getNumBgColor( number ) {
    switch( number ){
        case 2: return "#a2e1d4"; break;
        case 4: return "#2ae0c8"; break;
        case 8: return "#acf6ef"; break;
        case 16:return "#cbf5fb"; break;
        case 32: return "#bdf3d4"; break;
        case 64:return "#e6e2c3";break;
        case 128:return "#e3c887";break;
        case 256:return "#fad8be";break;
        case 512:return "#fbb8ac";break;
        case 1024:return "#fe6673";break;
        case 2048:return "#973c3f";break;
        case 4096:return "#7d5886";break;
        case 8192:return "#6b473c";break;
    }
}

function getNumColor( number ) {
    if (number <= 4)
        return "#6b473c";
    return "#6b473c";
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