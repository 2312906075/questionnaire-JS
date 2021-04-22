var previewbutton = document.getElementById("previewbutton");
var box = document.getElementById("box");
var radiobutton = document.getElementById("radio");
var checkbutton = document.getElementById("checkbox");
var starbutton = document.getElementById("star");
var writebutton = document.getElementById("write");
var question = document.getElementsByClassName("question");
var trash = document.getElementsByClassName("trash");
var move = document.getElementsByClassName("move");
var blue = document.getElementsByClassName("blue");

/*function createbox() {
    var boxnone = document.createElement("div");
    boxnone.id = "boxnone";
    boxnone.textContent = "马上开始制作问卷吧！";
    return boxnone;
}

box.appendChild(createbox());

function watchBox() {
    var boxnoned = document.getElementById("boxnone");
    if (box.contains(boxnoned)) {
        box.removeChild(boxnoned);
    } else if (box.getElementsByTagName("div").length === 0) {
        box.appendChild(createbox());
    }
}*/


function bluebox() {
    var bluebox = document.createElement("div");
    bluebox.className = "blue";
    return bluebox;
}

function getx(e) {
    e = e || window.event;
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var pageX = e.pageX || e.clientX + scrollLeft;
    return pageX;
}

function gety(e) {
    e = e || window.event;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var pageY = e.pageY || e.clientY + scrollTop;
    return pageY;
}


/*function cloneObject(obj) {
    if (typeof obj != "object") {
        return;
    }
    return JSON.parse(JSON.stringify(obj));
}*/

var ismove = false;

function rule() {
    for (let i = 0; i < question.length; i++) {
        question[i].getElementsByClassName("index")[0].textContent = (i + 1);
        question[i].id = "p" + (i + 1);
        question[i].onclick = function () {
            for (j = 0; j < question.length; j++) {
                question[j].style.border = "2px solid white";
            }
            this.style.border = "2px solid #0084FF";
        }
        question[i].onmouseenter = function () {
            this.getElementsByClassName("trash")[0].style.display = "block";
            this.getElementsByClassName("move")[0].style.display = "block";

        }
        question[i].onmouseleave = function () {
            if (this != document.activeElement) {
                this.getElementsByClassName("trash")[0].style.display = "none";
                this.getElementsByClassName("move")[0].style.display = "none";
            }
        }

        question[i].getElementsByClassName("move")[0].onmousedown = function () {
            var movedad = this.parentNode;
            nowy = this.parentNode.offsetTop;
            nowx = this.parentNode.offsetLeft;
            y = gety() - box.offsetTop - this.parentNode.offsetTop;
            x = getx() - box.offsetLeft - this.parentNode.offsetLeft;
            ismove = true;
            this.parentNode.style.position = "absolute";
            this.parentNode.style.opacity = "0.7";
            this.parentNode.style.zIndex = "1000";
            this.parentNode.style.top = nowy;
            this.parentNode.style.left = nowx;
            /*  console.log(nowx + " " + nowy + " " + y + " " + x);*/
            ind = parseInt(i);
            if (question.length === 1) {
                box.insertBefore(bluebox(), movedad);
            } else if (question[ind + 1]) {
                box.insertBefore(bluebox(), question[ind + 1]);
            } else if (!question[ind + 1]) {
                box.appendChild(bluebox());
            }
            /*移动*/
            window.onmousemove = function () {
                if (blue[0]) {
                    for (j = 0; j < blue.length; j++) {
                        blue[j].remove();
                    }
                }
                if (ismove === false) {
                    return;
                }
                var movey = gety() - y - box.offsetTop;
                var movex = getx() - x - box.offsetLeft;
                movedad.style.top = movey + "px";
                movedad.style.left = movex + "px";
                if (question.length === 1) {
                    box.insertBefore(bluebox(), movedad);/*总共只有一题*/
                } else if (question[ind + 1] && ind !== 0 && movey > question[ind - 1].offsetTop && movey <= question[ind + 1].offsetTop) {
                    box.insertBefore(bluebox(), question[ind + 1]);/*题目在三题及以上，题目在（原位）非连续的两题之间*/
                } else if (ind === 0 && movey <= question[1].offsetTop) {
                    box.insertBefore(bluebox(), question[1]);/*题目是第一题，并且还在最顶部*/
                } else if (ind !== 0 && movey <= question[0].offsetTop) {
                    box.insertBefore(bluebox(), question[0]);/*题目并非第一题，但是移到第一题上面*/
                } else {
                    for (j = 0; j < question.length; j++) {
                        if (j !== ind && j !== (ind - 1) && movey >= question[j].offsetTop && movey <= question[j + 1].offsetTop) {
                            box.insertBefore(bluebox(), question[j + 1]);/*题目在三题及以上，并且在连续的两题之间*/
                            break;
                        } else if (ind === (question.length - 1) && movey >= question[ind - 1].offsetTop) {
                            box.appendChild(bluebox());/*题目是最后一题*/
                            break;
                        } else if (ind !== (question.length - 1) && movey >= question[question.length - 1].offsetTop) {
                            box.appendChild(bluebox());/*题目并非最后一题，但是移到了最后一题后面*/
                            break;
                        }
                    }
                }
            }

            window.onmouseup = function () {
                if (ismove) {
                    ismove = false;
                    if (movedad.className.indexOf("isRadio") > -1) {
                        var clone = newRadio();
                        clone.getElementsByClassName("qheader")[0].value = movedad.getElementsByClassName("qheader")[0].value;
                        var radnum = movedad.getElementsByClassName("raddiv");
                        var clonenum = clone.getElementsByClassName("raddiv");

                        if (radnum.length == clonenum.length) {
                        } else if (radnum.length > clonenum.length) {
                            var gap = radnum.length - clonenum.length;
                            for (j = 0; j < gap; j++) {
                                clone.getElementsByClassName("add")[0].click();
                            }
                        } else if (radnum.length < clonenum.length) {
                            var gap = clonenum.length - radnum.length;
                            for (j = 0; j < gap; j++) {
                                clone.getElementsByClassName("reduce")[0].click();
                            }
                        }
                        for (i = 0; i < radnum.length; i++) {
                            clonenum[i].getElementsByClassName("rad-answer")[0].value = radnum[i].getElementsByClassName("rad-answer")[0].value;
                        }

                    } else if (movedad.className.indexOf("isCheckbox") > -1) {
                        var clone = newCheckbox();
                        clone.getElementsByClassName("qheader")[0].value = movedad.getElementsByClassName("qheader")[0].value;
                        var radnum = movedad.getElementsByClassName("raddiv");
                        var clonenum = clone.getElementsByClassName("raddiv");

                        if (radnum.length == clonenum.length) {
                        } else if (radnum.length > clonenum.length) {
                            var gap = radnum.length - clonenum.length;
                            for (j = 0; j < gap; j++) {
                                clone.getElementsByClassName("add")[0].click();
                            }
                        } else if (radnum.length < clonenum.length) {
                            var gap = clonenum.length - radnum.length;
                            for (j = 0; j < gap; j++) {
                                clone.getElementsByClassName("reduce")[0].click();
                            }
                        }
                        for (i = 0; i < radnum.length; i++) {
                            clonenum[i].getElementsByClassName("rad-answer")[0].value = radnum[i].getElementsByClassName("rad-answer")[0].value;
                        }
                    } else if (movedad.className.indexOf("isStar") > -1) {
                        var clone = newStar();
                        clone.getElementsByClassName("qheader")[0].value = movedad.getElementsByClassName("qheader")[0].value;
                    } else if (movedad.className.indexOf("isWrite") > -1) {
                        var clone = newWrite();
                        clone.getElementsByClassName("qheader")[0].value = movedad.getElementsByClassName("qheader")[0].value;
                    }
                    movedad.remove();
                }
                if (blue[0]) {
                    box.insertBefore(clone, blue[0]);
                    blue[0].remove();
                }
                rule();

            }
        }


    }

    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            if (confirm("确定要删除该题吗？")) {
                this.parentNode.parentNode.removeChild(this.parentNode);
                rule();
            }
        }
    }

    document.onclick = function (e) {
        var e = e || window.event;
        var elem = e.target;
        if (box.contains(elem)) {
        } else {
            for (i = 0; i < question.length; i++) {
                question[i].style.border = "2px solid white";
            }
        }
    }
}

rule();

radiobutton.onclick = function (e) {
    for (i = 0; i < question.length; i++) {
        question[i].style.border = "2px solid white";
    }
    e.stopPropagation();
    var newq = newRadio();
    newq.style.border = "2px solid #0084FF";
    box.appendChild(newq);
    rule();
    var nqid = newq.id;
    ScrollToControl(nqid);
}

checkbutton.onclick = function (e) {
    for (i = 0; i < question.length; i++) {
        question[i].style.border = "2px solid white";
    }
    e.stopPropagation();
    var newq = newCheckbox();
    newq.style.border = "2px solid #0084FF";
    box.appendChild(newq);
    rule();
    var nqid = newq.id;
    ScrollToControl(nqid);
}

starbutton.onclick = function (e) {
    for (i = 0; i < question.length; i++) {
        question[i].style.border = "2px solid white";
    }
    e.stopPropagation();
    var newq = newStar();
    newq.style.border = "2px solid #0084FF";
    box.appendChild(newq);
    rule();
    var nqid = newq.id;
    ScrollToControl(nqid);
}

writebutton.onclick = function (e) {
    for (i = 0; i < question.length; i++) {
        question[i].style.border = "2px solid white";
    }
    e.stopPropagation();
    var newq = newWrite();
    newq.style.border = "2px solid #0084FF";
    box.appendChild(newq);
    rule();
    var nqid = newq.id;
    ScrollToControl(nqid);
}

