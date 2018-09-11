var dstObj = {
    /* graphics */
    /* focusable elements */
    items: ["infoArea", "testArea"],
    lastBlurred: null,
    nowFocused: null,
    bgInit: 0,
    fgInit: 0,
    timeOut: null,
    vGMain: null,
    debug: false,
    backgColour: ["black", "white", "red", "blue", "green", "yellow", "brown"],
    forgColour: ["black", "white", "red", "blue", "green", "yellow", "brown"],

    dPrint: function(x) {
        if (this.debug === true) {
            window.console.log(x);
        }
    },

    keyHandler: function(event) {
        var b_size = document.getElementById('bottomRow');
        var f_size = document.getElementById('fourthRow');
        var th_size = document.getElementById('thirdRow');
        var s_size = document.getElementById('secondRow');
        var t_size = document.getElementById('topRow');
        var inf = document.getElementById('infoArea');
        var test = document.getElementById('testArea');


        var bg_colour = document.getElementById('testArea');

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
                    this.dPrint("Right key");
                    this.fgInit--;
                    if (this.fgInit <= 0)
                        this.fgInit = this.forgColour.length - 1;

                    bg_colour.style.color = this.forgColour[this.fgInit];
                    this.dPrint("col= " + this.forgColour[this.fgInit]);
                    this.dPrint("Red key");
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    this.fgInit++;
                    if (this.fgInit > this.forgColour.length)
                        this.fgInit = 0;
                    bg_colour.style.color = this.forgColour[this.fgInit];
                    break;

                case 461:
                    window.clearTimeout(this.timeOut);
                    this.dPrint("Green key");
                    window.open("../index.app", "_self");
                    break;

                case event.VK_YELLOW:
                case KeyEvent.VK_YELLOW:
                case KeyEvent.DOM_VK_YELLOW:
                    this.bgInit++;
                    if (this.bgInit > this.backgColour.length)
                        this.bgInit = 0;
                    bg_colour.style.backgroundColor = this.backgColour[this.bgInit];
                    break;

                case event.VK_BLUE:
                case KeyEvent.VK_BLUE:
                case KeyEvent.DOM_VK_BLUE:
                    this.bgInit--;
                    if (this.bgInit === 0)
                        this.bgInit = this.backgColour.length;
                    bg_colour.style.backgroundColor = this.backgColour[this.bgInit];
                    break;


                case KeyEvent.DOM_VK_RIGHT:
                    window.speechSynthesis.cancel();
                    window.clearTimeout(this.timeOut);
                    test.style.borderColor = "red";
                    inf.style.borderColor = "black";
                    //    test.focus();
                    break;

                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    window.clearTimeout(this.timeOut);
                    inf.focus();
                    break;

                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    // Prev list
                    t_size.style.fontSize = "32pt";
                    s_size.style.fontSize = "28pt";
                    th_size.style.fontSize = "24pt";
                    f_size.style.fontSize = "20pt";
                    b_size.style.fontSize = "16pt";
                    this.dPrint("Down key");
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    // Prev list
                    t_size.style.fontSize = "64pt";
                    s_size.style.fontSize = "46pt";
                    th_size.style.fontSize = "48pt";
                    f_size.style.fontSize = "40pt";
                    b_size.style.fontSize = "32pt";
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    //toggle selection 
                    break;
                default:
                    return false;
            }
            return true;

        } catch (e) {
            this.dPrint("KeyHandler: " + e, 5000);
        }
    },

    init: function() {
        var head = document.getElementById("header");
        mhbbtv.init();
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();
        document.addEventListener('keyup', this.keyHandler.bind(this), false);

        /* set event handlers for info window */
        for (var a = 0; a < this.items.length; a++) {
            var t = document.getElementById(this.items[a]);
            t.addEventListener('focusin', function(event) {
                event.stopPropagation();
                dstObj.vGMain.readAriaDescribed(event.target, true);
                event.target.style.borderColor = "red";
                window.clearTimeout(this.timeOut);
            }, false);
            t.addEventListener('focusout', function(event) {
                event.stopPropagation();
                event.target.style.borderColor = "";
            }, false);
        }


        this.vGMain.readAriaDescribed(head, true);
        this.timeOut = setTimeout(function() {
            dstObj.setFocus(dstObj.items[0]);
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