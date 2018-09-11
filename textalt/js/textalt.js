var taObj = {
    /* graphics */
    /* focusable elements */
    items: [
        ["pic1", "pic2", "pic3"],
        ["pic4", "pic5", "pic6"],
        ["pic7", "pic8", "pic9"]
    ],
    vert: 0,
    horz: 0,
    selectError: 0,
    secCount: 0,
    findStart: false,
    iTimer: null,
    lastBlurred: null,
    nowFocused: null,
    fcs: document.getElementById("pic1"),
    timeOut: null,
    debug: false,
    vGMain: null,

    dPrint: function(x) {
        if (this.debug === true) {
            window.console.log(x);
        }
    },

    setTimer: function() {
        this.iTimer = setInterval(function() {
            taObj.secCount++;
            document.getElementById("secTime").innerHTML = "Sec:" + taObj.secCount;
        }, 1000);
    },

    resetTimer: function() {
        clearInterval(this.iTimer);
        document.getElementById("secTime").innerHTML = "Sec:" + 0;
    },

    stopTimer: function() {
        clearInterval(this.iTimer);
    },

    keyHandler: function(event) {
        var pfoc = null;
        var lfoc = null;
        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }

        try {
            this.dPrint("event.keyCode" + event.keyCode);
            switch (event.keyCode) {

                case event.VK_1:
                case KeyEvent.VK_1:
                case KeyEvent.DOM_VK_1:
                    location.reload();
                    break;

                case event.VK_RED:
                case KeyEvent.VK_RED:
                case KeyEvent.DOM_VK_RED:
                    this.dPrint("Red key");
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                    break;
                case 461:
                    // switch player
                    window.clearTimeout(this.timeOut);
                    this.dPrint("Green key");
                    window.open("../index.app", "_self");
                    break;
                case KeyEvent.DOM_VK_RIGHT:
                    // Next list
                    if (this.nowFocused === 'infoArea') {
                        lfoc = document.getElementById('infoArea');
                        lfoc.blur();
                        lfoc.style.borderColor = 'black';
                        this.nowFocused = '';
                        this.horz = 0;
                        this.vert = 0;
                        pfoc = document.getElementById(this.items[0][0]);
                        pfoc.focus();
                    } else if (this.horz != 2)
                        this.horz++;
                    break;

                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    // Prev list
                    this.dPrint("Left key");
                    if (this.horz != 0)
                        this.horz--;
                    else if (this.horz === 0) {
                        this.horz--;
                        this.nowFocused = 'infoArea';
                        lfoc = document.getElementById(this.items[this.vert][0]);
                        lfoc.blur();
                        lfoc.style.backgroundColor = "";
                        pfoc = document.getElementById('infoArea');
                        pfoc.focus();
                        pfoc.style.borderColor = 'red';
                    }
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    this.dPrint("Down key");
                    if (this.vert != 2)
                        this.vert++;
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    this.dPrint("Up key");
                    if (this.vert != 0)
                        this.vert--;
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    //toggle selection
                    pfoc = document.activeElement;
                    for (var i = 0; i < pfoc.childNodes.length; i++) {
                        if (pfoc.childNodes[i].className === "checkbox") {
                            if (pfoc.childNodes[i].checked === true) {
                                pfoc.childNodes[i].checked = false;
                                if (pfoc.firstChild.alt === 'A Cat') {
                                    if (this.findStart === true) {
                                        this.selectError++;
                                        this.VgMain.readTxt("Un Selected, error");
                                        document.getElementById("errorC").innerHTML = "error:" + this.selectError;
                                    } else {
                                        this.vGMain.readTxt("Un Selected");
                                    }
                                }
                                break;
                            } else {

                                pfoc.childNodes[i].checked = true;
                                if (pfoc.firstChild.alt === 'A Cat') {
                                    if (this.findStart === false) {
                                        this.dPrint("start Timer");
                                        this.findStart = true;
                                        this.setTimer();
                                        this.vGMain.readTxt("Selected");
                                    } else if (this.areAllCatsFound() === true) {
                                        this.vGMain.readTxt("Selected: Complete");
                                        this.stopTimer();
                                        document.getElementById("secTime").style.backgroundColor = "green";
                                    } else {
                                        this.vGMain.readTxt("Selected");
                                    }
                                } else if (pfoc.firstChild.alt === 'A Dog') {
                                    this.vGMain.readTxt("Selected: Error");
                                    this.findStart = true;
                                    this.setTimer();
                                    this.selectError++;
                                    document.getElementById("errorC").style.backgroundColor = "red";
                                    document.getElementById("errorC").innerHTML = "error:" + this.selectError;
                                }
                                break;
                            }
                        }
                    }
                    break;

                default:
                    return false;
            }
            if (this.nowFocused != 'infoArea')
                this.setFocus(this.items[this.vert][this.horz]);
            return true;

        } catch (e) {
            this.dPrint("KeyHandler: " + e, 5000);
        }
    },


    setRandom: function() {
        for (var i = 0; i < 5; i++) {
            var e = Math.floor((Math.random() * 3));
            var f = Math.floor((Math.random() * 3));
            var g = document.getElementById(this.items[e][f]).firstChild;

            if (g)
                this.setCat(this.items[e][f]);
        }
        for (var h = 0; h < this.items.length; h++) {
            for (var j = 0; j < this.items.length; j++) {
                var k = document.getElementById(this.items[h][j]).firstChild;
                if (k && k.getAttribute('src') == '') {
                    this.setDog(this.items[h][j]);
                }
            }
        }
    },

    setCat: function(i_d) {
        this.dPrint("set cat id=" + i_d);
        var x = document.getElementById(i_d).firstChild;
        x.src = "img/cat01.png";
        x.alt = "A Cat";
    },

    setDog: function(i_d) {
        var x = document.getElementById(i_d).firstChild;
        x.src = "./img/dog.png";
        x.alt = "A Dog";
    },

    areAllCatsFound: function() {
        for (var h = 0; h < this.items.length; h++) {
            for (var j = 0; j < this.items.length; j++) {
                var k = document.getElementById(this.items[h][j]);
                if (k.hasChildNodes()) {
                    if (k.childNodes[0] && k.childNodes[0].alt === 'A Cat') {
                        if (k.children[1] && k.childNodes[1].checked === false) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },

    init: function() {
        mhbbtv.init();
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();
        this.vGMain.enable = true;

        var x = document.getElementById("infoArea");
        var head = document.getElementById("header");

        /* key hanlder */
        document.addEventListener('keyup', this.keyHandler.bind(this), false);

        /* watch infoArea selection */
        document.addEventListener('focusin', function(event) {
            if (event.target.firstChild.className == "aniimg") {
                event.target.style.background = "red";
                taObj.vGMain.readTxt(event.target.firstChild.alt);
            } else {
                event.target.style.borderColor = "red";
                taObj.vGMain.readAriaDescribed(event.target, true);
            }
            event.stopPropagation();
        }, false);


        document.addEventListener('focusout', function(event) {
            if (event.target.firstChild.className === "aniimg") {
                event.target.style.background = "";
            } else {
                event.target.style.borderColor = "";
            }
            event.stopPropagation();
        }, false);

        /* handlers for images */
        for (var i = 0; i < this.items.length; i++) {
            for (var a = 0; a < this.items.length; a++) {
                var t = document.getElementById(this.items[a][i]);
                t.childNodes[1].checked = false;
            }
        }

        document.getElementById("secTime").innerHTML = "Sec:" + 0;
        document.getElementById("errorC").innerHTML = "Error:" + 0;
        document.getElementById("secTime").style.backgroundColor = "black";
        document.getElementById("errorC").style.backgroundColor = "black";

        this.setRandom();

        this.vGMain.readAriaDescribed(head, true);

        this.timeOut = setTimeout(function() {
            taObj.nowFocused = "infoArea";
            taObj.setFocus("infoArea");
        }, 5000);

    },

    setFocus: function(e) {
        var y = document.activeElement;
        var x = document.getElementById(e);
        if (y && y !== x) {
            this.lastBlurred = y;
            y.blur();
        }
        if (x) {
            x.focus();
        }
    },
}