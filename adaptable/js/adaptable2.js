var ad2Obj = {
    /* graphics */
    /* focusable elements */
    items: ["infoArea", "feed0", "feed1", "feed2"],
    vert: 0,
    horz: 0,
    selectError: 0,
    secCount: 0,
    findStart: false,
    iTimer: null,
    lastBlurred: null,
    nowFocused: null,
    timeout: null,
    vGMain: null,

    dPrint: function(x) {
        if (this.debug == true) {
            window.console.log(x)
        }
    },

    keyHandler: function(event) {
        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }
        var x = document.getElementById("infoArea");

        try {
            window.console.log("event.keyCode" + event.keyCode);
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
                    window.console.log("Red key");
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    // switch player
                    break;
                case KeyEvent.DOM_VK_RIGHT:
                    window.speechSynthesis.cancel();
                    window.clearTimeout(ad2Obj.timeout);
                    ad2Obj.vert = 1;
                    break;
                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    window.speechSynthesis.cancel();
                    window.clearTimeout(ad2Obj.timeout);
                    // switch player
                    ad2Obj.vert = 0;
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    // Prev list
                    window.speechSynthesis.cancel();
                    window.console.log("Down key");
                    if (ad2Obj.vert < this.items.length)
                        ad2Obj.vert++;
                    if (ad2Obj.vert === this.items.length)
                        ad2Obj.vert = 1;
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    window.speechSynthesis.cancel();
                    // Prev list
                    window.console.log("Up key");
                    if (ad2Obj.vert > 0)
                        ad2Obj.vert--;
                    break;
                case 461:
                    // switch player
                    window.clearTimeout(ad2Obj.timeout);
                    window.console.log("Green key");
                    window.open("../index.app", "_self");
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    break;
                default:
                    return false;
            }
            ad2Obj.setFocus(this.items[ad2Obj.vert]);
            return true;

        } catch (e) {
            window.console.log("KeyHandler: " + e, 5000);
        }
    },




    init: function() {
        var head = document.getElementById("header");
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();
        this.vGMain.enable = true;
        mhbbtv.init();
        ad2Obj.vert = 1;
        document.addEventListener('keyup', ad2Obj.keyHandler.bind(this), false);
        document.addEventListener('focusin', ad2Obj.sFocus.bind(this), false);
        document.addEventListener('focusout', ad2Obj.lFocus.bind(this), false);

        feed.init();
        this.vGMain.readAriaDescribed(head, true);
        this.timeout = setTimeout(function() {
            ad2Obj.setFocus(ad2Obj.items[0]);
        }, 5000);
    },

    sFocus: function(e) {
        window.console.log("focus set:" + e.target.id);
        e.target.style.borderColor = "red";
        ad2Obj.vGMain.readAriaDescribed(e.target, true);
    },

    lFocus: function(e) {
        window.console.log("focus lost:" + e.target.id);
        e.target.style.borderColor = "";
    },

    SpeakFocus: function(e) {
        this.dPrint("focus element = " + e.target.id);
    },

    setFocus: function(e) {
        var y = document.activeElement;
        var x = document.getElementById(e);
        if (y && y !== x) {
            ad2Obj.lastBlurred = y;
            y.blur();
        }

        if (x) {
            x.focus();
            x.borderColor = "red";
        }

    },

}