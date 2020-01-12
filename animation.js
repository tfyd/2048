function showNum(i, j, n) {
    console.log("shownum");
    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css('background-color', getNumBgColor(n));
    numberCell.css('color', getNumColor(n));
    numberCell.text( n );

    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMove(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200)
}