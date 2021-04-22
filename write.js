function newWrite() {
    var write = document.createElement("div");
    write.className = "question isWrite";

    var newindex = document.createElement("div");
    newindex.className = "index";
    write.appendChild(newindex);

    var newmove = document.createElement("div");
    newmove.className = "move";
    var newmovea = document.createElement("a");
    newmovea.className = "hint-- hint--bottom";
    newmovea.setAttribute("data-hint", "按住移动题目");
    newmove.appendChild(newmovea);
    write.appendChild(newmove);

    var newtrash = document.createElement("div");
    newtrash.className = "trash";
    var newtrasha = document.createElement("a");
    newtrasha.className = "hint-- hint--bottom";
    newtrasha.setAttribute("data-hint", "删除项目");
    newtrash.appendChild(newtrasha);
    write.appendChild(newtrash);

    var newheader = document.createElement("input");
    newheader.className = "qheader";
    newheader.setAttribute("placeholder", "请对本题提问进行作答");
    write.appendChild(newheader);

    var writebox = document.createElement("div");
    writebox.className = "writebox";
    write.appendChild(writebox);


    var input = write.getElementsByClassName("qheader");
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

    return write;
}