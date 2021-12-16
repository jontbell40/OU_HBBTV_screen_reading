var adObj = {
    /* graphics */
    /* focusable elements */
    items: [
        ["pic1", "pic2", "pic3"],
        ["infoArea", null, null],
        ["pic4", "pic5", "pic6"],
        ["pic7", "pic8", "pic9"],
        ["pic10", "pic11", "pic12"],
        ["pic13", "pic14", "pic15"],
        ["pic16", "pic17", "pic18"],
        ["pic19", "pic20", "pic21"],
        ["pic22", "pic23", "pic24"]
    ],
    vert: 0,
    horz: 0,
    selectError: 0,
    secCount: 0,
    findStart: false,
    iTimer: null,
    lastBlurred: null,
    nowFocused: null,
    timeout: null,
    vGmain: null,
    debug: false,

    dPrint: function(x) {
        if (this.debug === true) {
            window.console.log(x);
        }
    },

    keyHandler: function(event) {
        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }
        var x = document.getElementById("infoArea");

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
                    // Go back
                    this.dPrint("Red key");
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    // switch player
                    break;
                case KeyEvent.DOM_VK_RIGHT:
                    window.speechSynthesis.cancel();
                    // Next list
                    window.clearTimeout(this.timeOut);
                    this.vert = 2;
                    x.style.borderColor = "black";
                    x = document.getElementById(this.items[2][0]);
                    x.focus();
                    break;
                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    window.speechSynthesis.cancel();
                    // switch player
                    this.vert = 1;
                    x.focus();
                    x.style.borderColor = "red";
                    this.setFocus("infoArea");
                    this.timeOut = setTimeout(function() {
                        window.speechSynthesis.cancel();
                        adObj.vGMain.readInfo(x);
                    }, 1000);
                    // Prev list
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    // Prev list
                    window.speechSynthesis.cancel();
                    this.dPrint("Down key");
                    if (this.vert != 8)
                        this.vert++;
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    window.speechSynthesis.cancel();
                    // Prev list
                    this.dPrint("Up key");
                    if (this.vert != 2)
                        this.vert--;
                    break;
                case 461:
                    // switch player
                    window.clearTimeout(this.timeOut);
                    this.dPrint("Green key");
                    window.open("../index.app", "_self");
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
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

    getTempFromDayString: function(day) {
        var d = null;
        if (day === 'Monday')
            d = document.getElementById(this.items[2][1]);
        else if (day === 'Tuesday')
            d = document.getElementById(this.items[3][1]);
        else if (day === 'Wednesday')
            d = document.getElementById(this.items[4][1]);
        else if (day === 'Thursday')
            d = document.getElementById(this.items[5][1]);
        else if (day === 'Friday')
            d = document.getElementById(this.items[6][1]);
        else if (day === 'Saturday')
            d = document.getElementById(this.items[7][1]);
        else if (day === 'Sunday')
            d = document.getElementById(this.items[8][1]);
        return d.innerHTML;
    },

    getConditionFromDayString: function(day) {
        var d = null;
        if (day === 'Monday')
            d = document.getElementById(this.items[2][2]);
        else if (day === 'Tuesday')
            d = document.getElementById(this.items[3][2]);
        else if (day === 'Wednesday')
            d = document.getElementById(this.items[4][2]);
        else if (day === 'Thursday')
            d = document.getElementById(this.items[5][2]);
        else if (day === 'Friday')
            d = document.getElementById(this.items[6][2]);
        else if (day === 'Saturday')
            d = document.getElementById(this.items[7][2]);
        else if (day === 'Sunday')
            d = document.getElementById(this.items[8][2]);
        return d.innerHTML;
    },

    init: function() {
        var x = document.getElementById("infoArea");
        var head = document.getElementById("header");
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();
        mhbbtv.init();
        this.vert = 1;
        this.horz = 0;


        this.vGMain.enable = true;
        document.addEventListener('keyup', this.keyHandler.bind(this), false);

        document.addEventListener('focusin', function(event) {
            if (event.target.id !== "infoArea") {
                var temp = adObj.getTempFromDayString(event.target.innerHTML);
                var cond = adObj.getConditionFromDayString(event.target.innerHTML);
                if (temp != null && cond != null) {
                    window.speechSynthesis.cancel();
                    adObj.vGMain.readTxt(event.target.innerHTML + " Temperature is " + temp + " Degrees C Condition is " + cond);
                }
                event.target.innerHTML += "*";

            } else if (event.target.id === "infoArea") {

                adObj.vGMain.readAriaDescribed(event.target);
                event.target.style.borderColor = "red";
            }
            window.clearTimeout(adObj.timeOut);
            event.stopPropagation();
        }, false);
        document.addEventListener('focusout', function(event) {
            event.stopPropagation();
            if (event.target.id != "infoArea") {
                event.target.innerHTML = event.target.innerHTML.slice(0, -1);
            } else {
                event.target.style.borderColor = "";
            }
        }, false);


        window.speechSynthesis.cancel();
        this.vGMain.readAriaDescribed(head, true);
        //x.style.borderColor = "red";
        this.timeOut = setTimeout(function() {
            window.speechSynthesis.cancel();
            adObj.setFocus("infoArea");
            //adObj.vGMain.readInfo(x);
        }, 3000);
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