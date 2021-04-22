var previewbox = document.getElementById("previewbox");
var close = document.getElementById("close");

function radioLabel() {
    var radiolabel = document.createElement("label");

    var input = document.createElement("input");
    input.type = "radio";
    radiolabel.appendChild(input);

    var rewords = document.createElement("div");
    rewords.className = "rewords";
    radiolabel.appendChild(rewords);

    return radiolabel;
}

function replyRadio() {
    var radio = document.createElement("div");
    radio.className = "reply isradio";

    var reindex = document.createElement("div");
    reindex.className = "index";
    radio.appendChild(reindex);

    var pheader = document.createElement("div");
    pheader.textContent = "请选择一个选项";
    pheader.className = "pheader";
    radio.appendChild(pheader);

    return radio;
}

function setRadio() {
    var preview = document.getElementById("preview");
    if (preview.getElementsByClassName("isradio")) {
        var radio = preview.getElementsByClassName("isradio");
        for (i = 0; i < radio.length; i++) {
            var ind = i;
            var label = radio[i].getElementsByTagName("label");
            for (j = 0; j < label.length; j++) {
                label[j].getElementsByTagName("input")[0].name = "radio" + ind;
                label[j].getElementsByTagName("input")[0].id = "radio" + ind + j;
                label[j].for = "radio" + ind + j;
            }
        }
    }
}

function checkLabel() {
    var checklabel = document.createElement("label");

    var input = document.createElement("input");
    input.type = "checkbox";
    checklabel.appendChild(input);

    var rewords = document.createElement("div");
    rewords.className = "rewords";
    checklabel.appendChild(rewords);

    return checklabel;
}

function replyCheck() {
    var checkbox = document.createElement("div");
    checkbox.className = "reply ischeck";

    var reindex = document.createElement("div");
    reindex.className = "index";
    checkbox.appendChild(reindex);

    var pheader = document.createElement("div");
    pheader.textContent = "请选择一个或多个选项";
    pheader.className = "pheader";
    checkbox.appendChild(pheader);

    return checkbox;
}

function setCheck() {
    var preview = document.getElementById("preview");
    if (preview.getElementsByClassName("ischeck")) {
        var check = preview.getElementsByClassName("ischeck");
        for (i = 0; i < check.length; i++) {
            var ind = i;
            var label = check[i].getElementsByTagName("label");
            for (j = 0; j < label.length; j++) {
                label[j].getElementsByTagName("input")[0].name = "check" + ind;
                label[j].getElementsByTagName("input")[0].id = "check" + ind + j;
                label[j].for = "check" + ind + j;
            }
        }
    }
}

function replyWrite() {
    var wrote = document.createElement("div");
    wrote.className = "reply iswrite";

    var reindex = document.createElement("div");
    reindex.className = "index";
    wrote.appendChild(reindex);

    var pheader = document.createElement("div");
    pheader.textContent = "请对本题提问进行作答";
    pheader.className = "pheader";
    wrote.appendChild(pheader);

    var wrotebox = document.createElement("div");
    wrotebox.className = "wrote";
    wrotebox.contentEditable = "true";
    wrotebox.textContent = "此处应该是一个富文本编辑器";
    wrote.appendChild(wrotebox);

    return wrote;
}

function replyStar() {
    var starreply = document.createElement("div");
    starreply.className = "reply isstar";

    var reindex = document.createElement("div");
    reindex.className = "index";
    starreply.appendChild(reindex);

    var pheader = document.createElement("div");
    pheader.textContent = "请对本题进行评价";
    pheader.className = "pheader";
    starreply.appendChild(pheader);

    var starbox = document.createElement("div");
    starbox.className = "starbox";

    for (i = 0; i < 5; i++) {
        var span = document.createElement("span");
        span.className = "white";
        starbox.appendChild(span);
    }

    starreply.appendChild(starbox);

    var gatherstar = starreply.getElementsByTagName("span");
    for (let i = 0; i < gatherstar.length; i++) {
        gatherstar[i].onclick = function () {
            for (j = 0; j < gatherstar.length; j++) {
                gatherstar[j].className = "white";
            }
            for (k = 0; k < (i + 1); k++) {
                gatherstar[k].className = "white light";
            }
        }
    }

    return starreply;
}

function preview() {
    var preview = document.createElement("div");
    preview.id = "preview";
    for (j = 0; j < question.length; j++) {
        if (question[j].className.indexOf("isRadio") > -1) {
            var clone = replyRadio();
            var num = question[j].getElementsByClassName("raddiv");
            for (k = 0; k < num.length; k++) {
                clone.appendChild(radioLabel());
            }
            if (question[j].getElementsByClassName("qheader")[0].value) {
                clone.getElementsByClassName("pheader")[0].textContent = question[j].getElementsByClassName("qheader")[0].value;
            }
            for (a = 0; a < num.length; a++) {
                if (num[a].getElementsByClassName("rad-answer")[0].value) {
                    clone.getElementsByClassName("rewords")[a].textContent = num[a].getElementsByClassName("rad-answer")[0].value;
                } else {
                    clone.getElementsByClassName("rewords")[a].textContent = "选项" + (a + 1);
                }

            }
            preview.appendChild(clone);
        } else if (question[j].className.indexOf("isCheckbox") > -1) {
            var clone = replyCheck();
            var num = question[j].getElementsByClassName("raddiv");
            for (k = 0; k < num.length; k++) {
                clone.appendChild(checkLabel());
            }
            if (question[j].getElementsByClassName("qheader")[0].value) {
                clone.getElementsByClassName("pheader")[0].textContent = question[j].getElementsByClassName("qheader")[0].value;
            }
            for (a = 0; a < num.length; a++) {
                if (num[a].getElementsByClassName("rad-answer")[0].value) {
                    clone.getElementsByClassName("rewords")[a].textContent = num[a].getElementsByClassName("rad-answer")[0].value;
                } else {
                    clone.getElementsByClassName("rewords")[a].textContent = "选项" + (a + 1);
                }
            }
            preview.appendChild(clone);
        } else if (question[j].className.indexOf("isWrite") > -1) {
            var clone = replyWrite();
            if (question[j].getElementsByClassName("qheader")[0].value) {
                clone.getElementsByClassName("pheader")[0].textContent = question[j].getElementsByClassName("qheader")[0].value;
            }
            preview.appendChild(clone);
        } else if (question[j].className.indexOf("isStar") > -1) {
            var clone = replyStar();
            if (question[j].getElementsByClassName("qheader")[0].value) {
                clone.getElementsByClassName("pheader")[0].textContent = question[j].getElementsByClassName("qheader")[0].value;
            }
            preview.appendChild(clone);
        }

    }
    var reply = preview.getElementsByClassName("reply");
    for (i = 0; i < reply.length; i++) {
        reply[i].getElementsByClassName("index")[0].textContent = (i + 1);
    }
    return preview;
}

function masksize() {
    _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    previewbox.style.width = _scrollWidth + "px";
    previewbox.style.height = _scrollHeight + "px";
}


previewbutton.onclick = function () {
    var pre = preview();
    document.body.appendChild(pre);
    setRadio();
    setCheck();
    pre.style.display = "block";
    masksize();
    previewbox.style.display = "block";
    close.style.display = "block";
}

close.onclick = function () {
    document.getElementById("preview").remove();
    previewbox.style.display = "none";
    close.style.display = "none";
}