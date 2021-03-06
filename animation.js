var name1 = {2: "叶修", 4: "黄少天", 8: "喻文州", 16: "张佳乐",
32: "孙哲平", 64: "王杰希", 128: "林敬言", 256: "方锐",
512: "苏沐橙", 1024: "吴羽策", 2048: "李轩", 4096: "戴妍琦",8192: "荣耀"};

var caren = {2: "真琴", 4: "达龙", 8: "亚尔斯兰", 16: "艾玛",
32: "雷", 64: "百合", 128: "实弥", 256: "炭治郎",
512: "善逸", 1024: "斯汀格", 2048: "纳兹", 4096: "谢怜",8192: "花城"};

var yd = {2: "费渡", 4: "骆闻舟", 8: "周自珩", 16: "夏习清",
32: "穆康", 64: "林衍", 128: "林浔", 256: "东君",
512: "林疏", 1024: "凌凤箫", 2048: "闻天和", 4096: "关越",8192: "杨思觅"};

var wkx = {2: "宁羿", 4: "魏无羡", 8: "谢允", 16: "卫来",
32: "沈倦", 64: "余淮", 128: "盛望", 256: "丁霁",
512: "蓝忘机", 1024: "游惑", 2048: "林无隅", 4096: "江添",8192: "萧驰野"};


function showNum(i, j, n) {
    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css('background-color', getNumBgColor(n));
    numberCell.css('color', getNumColor(n));
    numberCell.text(wkx[n]);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
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