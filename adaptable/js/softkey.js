var softKey = {
    focusedForm: null,
    gridPos: 0,
    gridWidth: 13,
    keysetInit: null,
    lastFocused: null,
    capsSet: false,
    debug: false,
    escapeFunc: null,

    keyset1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Del", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Enter", "Shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "#", "\\", "z", "x", "c", "v", "b", "n", "m", "@", ".", "/", "Space"],
    keyset2: ["!", "\"", "£", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Del", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "Enter", "Shift", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "@", "~", "|", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Space"],

    keyHandler: function(event) {
        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }
        try {
            softKey.dPrint("key value = " + event.keyCode);
            switch (event.keyCode) {
                case 461:
                    softKey.escapeFunc();
                    return true;
                    break;
                case event.VK_RED:
                case KeyEvent.VK_RED:
                case KeyEvent.DOM_VK_RED:
                    var inform = document.getElementById(softKey.focusedForm);
                    var tt = inform.childNodes[0].data;
                    inform.childNodes[0].data = tt.slice(0, -1);
                    this.dPrint("Red key");
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    if (softKey.capsSet == false) {
                        softKey.capsSet = true;
                        softKey.keysetInit = softKey.keyset2;
                        softKey.upDateKeysetCapitalize(softKey.keysetInit);

                    } else {
                        softKey.capsSet = false;
                        softKey.keysetInit = softKey.keyset1;
                        softKey.upDateKeysetLowerCase(softKey.keysetInit);
                    }
                    break;
                case event.VK_BLUE:
                case KeyEvent.VK_BLUE:
                case KeyEvent.DOM_VK_BLUE:
                    event.stopPropagation();
                    softKey.escapeFunc();
                    return true;
                    break;
                case event.VK_YELLOW:
                case KeyEvent.VK_YELLOW:
                case KeyEvent.DOM_VK_YELLOW:
                    var inform = document.getElementById(softKey.focusedForm);
                    inform.childNodes[0].data = inform.childNodes[0].data + " ";
                    break;

                case KeyEvent.DOM_VK_RIGHT:
                    if (softKey.gridPos < softKey.keysetInit.length)
                        softKey.gridPos = softKey.gridPos + 1;
                    break;
                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    if (softKey.gridPos > 0)
                        softKey.gridPos = softKey.gridPos - 1;
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    if ((softKey.gridPos + softKey.gridWidth) < softKey.keysetInit.length)
                        softKey.gridPos = softKey.gridPos + softKey.gridWidth
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    if (softKey.gridPos >= softKey.gridWidth)
                        softKey.gridPos = softKey.gridPos - softKey.gridWidth

                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    var inform = document.getElementById(softKey.focusedForm);
                    var ch = softKey.keysetInit[softKey.gridPos];
                    softKey.dPrint("form = " + softKey.focusedForm);
                    if (inform) {
                        softKey.dPrint("value of form = " + inform.childNodes[0].data);
                        if (softKey.isLetter(ch) ||
                            !isNaN(ch) ||
                            (ch === "!") ||
                            (ch === "\"") ||
                            (ch === "£") ||
                            (ch === "$") ||
                            (ch === "%") ||
                            (ch === "^") ||
                            (ch === "&") ||
                            (ch === "*") ||
                            (ch === "*") ||
                            (ch === "(") ||
                            (ch === ")") ||
                            (ch === "-") ||
                            (ch === "_") ||
                            (ch === "+") ||
                            (ch === "=") ||
                            (ch === "[") ||
                            (ch === "]") ||
                            (ch === "{") ||
                            (ch === "}") ||
                            (ch === ":") ||
                            (ch === ";") ||
                            (ch === "@") ||
                            (ch === "\'") ||
                            (ch === "~") ||
                            (ch === "#") ||
                            (ch === "\\") ||
                            (ch === "|'") ||
                            (ch === ",'") ||
                            (ch === ".'") ||
                            (ch === "?'") ||
                            (ch === "/'")) {
                            inform.childNodes[0].data = inform.childNodes[0].data + ch;
                        } else if (ch === "Space") {
                            inform.childNodes[0].data = inform.childNodes[0].data + " ";
                        } else if (ch === "Del") {
                            var tt = inform.childNodes[0].data;
                            inform.childNodes[0].data = tt.slice(0, -1);
                        } else if (ch === "Shift") {
                            if (softKey.capsSet == false) {
                                softKey.capsSet = true;
                                softKey.keysetInit = softKey.keyset2;
                                softKey.upDateKeysetCapitalize(softKey.keysetInit);

                            } else {
                                softKey.capsSet = false;
                                softKey.keysetInit = softKey.keyset1;
                                softKey.upDateKeysetLowerCase(softKey.keysetInit);
                            }
                        } else if (ch === "Enter") {
                            // How to tie this back.
                            event.stopPropagation();
                            //var l = document.getElementById(ch);
                            //l.blur();
                            //l.style.borderColor = "";
                            softKey.escapeFunc();
                            return true;
                        }
                    }

                    break;
                default:
                    break;
            }

            var x = document.getElementById(softKey.keysetInit[softKey.gridPos]);
            x.focus();
            softKey.setFocus(softKey.keysetInit[softKey.gridPos]);
        } catch (event) {
            softKey.dPrint("KeyHandler: " + event, 5000);
        }
    },

    isLetter: function(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    },

    keyPadDraw: function(keySet, rowSize, parentNode) {
        var x = 0;
        var table = null;
        var rowCount = 0;

        if (keySet && (keySet.length > 0)) {
            /* create first row */
            table = document.createElement("TABLE");


            table.setAttribute("id", "keypad");
            table.setAttribute("role", "grid");


            row = document.createElement("TR");
            row.setAttribute("id", "topRow");
            parentNode.appendChild(table);
            table.appendChild(row);
            var t = 0;

            for (var i = 0; i < keySet.length; i++) {
                t = t + 1;
                var cell = document.createElement("TD");
                cell.addEventListener('focus', softKey.printFocusCell, false);
                cell.setAttribute("id", keySet[i]);
                cell.setAttribute("role", "button");
                if (keySet[i] === "Space")
                    cell.setAttribute("colspan", "4");
                if (keySet[i] === "Shift" || keySet[i] === "Enter" || keySet[i] === "Del")
                    cell.setAttribute("colspan", "1");
                if (keySet[i] === "Shift")
                    cell.style.backgroundColor = "green";
                if (keySet[i] === "Del")
                    cell.style.backgroundColor = "red";
                if (keySet[i] === "Space") {
                    cell.style.backgroundColor = "yellow";
                    cell.style.color = "black";
                }
                if (keySet[i] === "Enter")
                    cell.style.backgroundColor = "blue";

                cell.setAttribute("tabindex", "" + i);
                if (i === 0)
                    cell.setAttribute("class", "tableSCell");
                var textC = document.createTextNode(keySet[i]);
                cell.appendChild(textC);
                table.appendChild(cell);

                if (t == rowSize) {
                    t = 0;
                    var row = null;
                    rowCount = rowCount + 1;
                    row = document.createElement("TR");
                    row.setAttribute("id", "row" + rowCount);
                    row.setAttribute("class", "tableSRow");
                    table.appendChild(row);
                }
                row.setAttribute("id", "bottomRow");
            }

        }
    },

    dPrint: function(x) {
        if (this.debug == true) {
            window.console.log(x)
        }
    },

    setFocus: function(name) {
        var x = document.getElementById(name);
        var y = document.getElementById(this.lastFocused);
        x.focus();
        x.style.borderColor = "red";
        this.dPrint("SoftKey event focused =" + name);
        if (y && x != y) {
            y.style.borderColor = "";
        }
        this.lastFocused = name;
    },



    hide: function() {
        var pad = document.getElementById("keyb");
        pad.style.zIndex = -1;
        pad.style.display = "none";
        pad.removeEventListener('keyup', softKey.keyHandler, false);
    },

    show: function(formId) {
        setTimeout(function() {
            var pad = document.getElementById("keyb");
            var x = document.getElementById(softKey.keysetInit[softKey.gridPos]);
            pad.addEventListener('focusin', softKey.printFocus, false);
            pad.addEventListener('keyup', softKey.keyHandler, false);
            softKey.focusedForm = formId;
            if (x) {
                pad.style.zIndex = 1;
                pad.style.display = "block";
                softKey.setFocus(softKey.keysetInit[softKey.gridPos]);
                x.focus();
            }
        }, 10);
    },

    upDateKeysetCapitalize: function(newKeyset) {
        for (var i = 0; i < softKey.keysetInit.length; i++) {
            var t = document.getElementById(softKey.keyset1[i]);
            t.id = newKeyset[i];
            t.innerHTML = newKeyset[i];
        }
    },

    upDateKeysetLowerCase: function(newKeyset) {
        for (var i = 0; i < softKey.keysetInit.length; i++) {
            var t = document.getElementById(softKey.keyset2[i]);
            t.id = newKeyset[i];
            t.innerHTML = newKeyset[i];
        }
    },

    printFocus: function(e) {
        softKey.dPrint("e.target.id = " + e.target.id);
    },
    printFocusCell: function(e) {
        softKey.dPrint("Cell e.target.id = " + e.target.id);
    },

    init: function(rtFunc) {
        var pad = document.getElementById("keyb");
        pad.style.zIndex = -1;
        pad.style.display = "none";
        this.keyPadDraw(this.keyset1, this.gridWidth, pad);
        this.keysetInit = this.keyset1;
        this.lastFocused = this.keysetInit[0];
        this.gridPos = 0;
        this.escapeFunc = rtFunc;
    },

}