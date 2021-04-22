function newcheck() {
    var newraddiv = document.createElement("div");
    newraddiv.className = "raddiv";
    var newi = document.createElement("i");
    newi.className = "check-point";
    newraddiv.appendChild(newi);
    var newinput = document.createElement("input");
    newinput.classList.add("qheader", "rad-answer");
    newraddiv.appendChild(newinput);
    var newreduce = document.createElement("div");
    newreduce.className = "reduce";
    var newreducea = document.createElement("a");
    newreducea.className = "hint-- hint--top tips";
    newreducea.setAttribute("data-hint", "删除该项");
    newreduce.appendChild(newreducea);
    newraddiv.appendChild(newreduce);
    var newadd = document.createElement("div");
    newadd.className = "add";
    var newadda = document.createElement("a");
    newadda.className = "hint-- hint--top tips";
    newadda.setAttribute("data-hint", "新增选项");
    newadd.appendChild(newadda);
    newraddiv.appendChild(newadd);
    return newraddiv;
}

function newCheckbox() {
    var radio = document.createElement("div");
    radio.className = "question isCheckbox";

    var newindex = document.createElement("div");
    newindex.className = "index";
    radio.appendChild(newindex);

    var newmove = document.createElement("div");
    newmove.className = "move";
    var newmovea = document.createElement("a");
    newmovea.className = "hint-- hint--bottom";
    newmovea.setAttribute("data-hint", "按住移动题目");
    newmove.appendChild(newmovea);
    radio.appendChild(newmove);

    var newtrash = document.createElement("div");
    newtrash.className = "trash";
    var newtrasha = document.createElement("a");
    newtrasha.className = "hint-- hint--bottom";
    newtrasha.setAttribute("data-hint", "删除项目");
    newtrash.appendChild(newtrasha);
    radio.appendChild(newtrash);

    var newheader = document.createElement("input");
    newheader.className = "qheader";
    newheader.setAttribute("placeholder", "请选择一个或多个选项");
    radio.appendChild(newheader);

    var brdownheader = document.createElement("br");
    radio.appendChild(brdownheader);

    radio.appendChild(newcheck());
    radio.appendChild(newcheck());
    radio.appendChild(newcheck());

    function radioChange() {
        var input = radio.getElementsByClassName("qheader");
        var rad = radio.getElementsByClassName("rad-answer");
        var raddiv = radio.getElementsByClassName("raddiv");
        var add = radio.getElementsByClassName("add");
        var reduce = radio.getElementsByClassName("reduce");
        for (let i = 0; i < rad.length; i++) {
            rad[i].placeholder = "选项" + (i + 1);
            rad[i].onfocus = function () {
                this.style.backgroundColor = "#F4F4F4";
                this.style.border = "1px solid white";
                add[i].style.display = "block";
                reduce[i].style.display = "block";
            }
            rad[i].onblur = function () {
                this.style.backgroundColor = "";
                this.style.border = "1px solid white";
                add[i].style.display = "none";
                reduce[i].style.display = "none";
            }
        }

        for (let i = 0; i < raddiv.length; i++) {
            raddiv[i].onmouseenter = function () {
                var radanswer = this.getElementsByClassName("rad-answer")[0];
                if (radanswer != document.activeElement) {
                    radanswer.style.border = "1px dashed #999";
                }
                add[i].style.display = "block";
                reduce[i].style.display = "block";
            }
            raddiv[i].onmouseleave = function () {
                var radanswer = this.getElementsByClassName("rad-answer")[0];
                radanswer.style.border = "1px solid white";
                if (radanswer != document.activeElement) {
                    add[i].style.display = "none";
                    reduce[i].style.display = "none";
                }
            }
        }

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

        for (i = 0; i < reduce.length; i++) {
            reduce[i].onclick = function (e) {
                e.stopPropagation();
                this.parentNode.parentNode.border = "2px solid #0084FF";
                if (reduce.length > 1) {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    radioChange();
                } else {
                    alert("至少保留一个选项哦！");
                }
            }
        }

        for (i = 0; i < add.length; i++) {
            add[i].onclick = function () {
                if (add.length < 10) {
                    this.parentNode.parentNode.appendChild(newcheck());
                    radioChange();
                } else {
                    alert("选项不能再多了哦！");
                }
            }
        }
    }

    radioChange();
    return radio;
}


