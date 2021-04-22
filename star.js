function newStar() {
    var star = document.createElement("div");
    star.className = "question isStar";

    var newindex = document.createElement("div");
    newindex.className = "index";
    star.appendChild(newindex);

    var newmove = document.createElement("div");
    newmove.className = "move";
    var newmovea = document.createElement("a");
    newmovea.className = "hint-- hint--bottom";
    newmovea.setAttribute("data-hint", "按住移动题目");
    newmove.appendChild(newmovea);
    star.appendChild(newmove);

    var newtrash = document.createElement("div");
    newtrash.className = "trash";
    var newtrasha = document.createElement("a");
    newtrasha.className = "hint-- hint--bottom";
    newtrasha.setAttribute("data-hint", "删除项目");
    newtrash.appendChild(newtrasha);
    star.appendChild(newtrash);

    var newheader = document.createElement("input");
    newheader.className = "qheader";
    newheader.setAttribute("placeholder", "请对本题进行评价");
    star.appendChild(newheader);

    var starTotal = document.createElement("div");
    starTotal.className = "star-total";
    for (i = 0; i < 5; i++) {
        starTotal.appendChild(document.createElement("span"));
    }
    star.appendChild(starTotal);

    var input = star.getElementsByClassName("qheader");
    input[0].onmouseenter = function () {
        if (this != document.activeElement) {
            this.style.border = "1px dashed #999";
        }
    }
    input[0].onmouseleave = function () {
        this.style.border = "1px solid white";
    }
    input[0].onfocus = function () {
        this.style.backgroundColor = "#F4F4F4";
        this.style.border = "1px solid white";
    }
    input[0].onblur = function () {
        this.style.backgroundColor = "";
        this.style.border = "1px solid white";
    }

    return star;

}