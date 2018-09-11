var mainObj = {
    /* focusable elements */
    /* these elements will be selectable by the remote control, they need a non -1 tabindex value */
    items: ["infoArea", "link1", "link2", "link3", "link4", "link5", "link6"],
    vert: 0,
    lastBlurred: null,
    nowFocused: null,
    fcs: document.getElementById("pic1"),
    timeOut: null,
    vGMain: null,
    debug: false,

    dPrint: function(x) {
        if (this.debug === true) {
            window.console.log(x);
        }
    },

    keyHandler: function(event) {
        var apos = null;

        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }
        try {
            switch (event.keyCode) {
                case event.VK_1:
                case KeyEvent.VK_1:
                case KeyEvent.DOM_VK_1:
                    location.reload();
                    break;
                case event.VK_RED:
                case KeyEvent.VK_RED:
                case KeyEvent.DOM_VK_RED:
                    break;
                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    break;
                case KeyEvent.DOM_VK_RIGHT:
                    this.vert = 1;
                    window.clearTimeout(mainObj.timeOut);
                    this.nowFocus = "link1";
                    break;
                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    window.clearTimeout(mainObj.timeOut);
                    this.vert = 0;
                    this.nowFocus = "infoArea";
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    window.clearTimeout(this.timeOut);
                    if (this.nowFocus !== "infoArea") {
                        if (this.vert != 6)
                            this.vert++;
                    }
                    break;
                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    window.clearTimeout(this.timeOut);
                    if (this.nowFocus !== "infoArea") {
                        if (this.vert != 1)
                            this.vert--;
                    }
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    window.clearTimeout(this.timeOut);
                    window.speechSynthesis.cancel();
                    apos = document.activeElement;
                    window.open(apos.firstChild.href, "_self");
                    break;
                default:
                    break;
            }
            mainObj.setFocus(this.items[this.vert]);
        } catch (e) {
            this.dPrint("KeyHandler: " + e, 5000);
        }
    },


    init: function() {
        var x = document.getElementById("infoArea");
        var y = document.getElementById("header");
        /* initialise hbbtv */
        mhbbtv.init();
        /* create new voice guidance option */
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();

        document.addEventListener('keyup', this.keyHandler.bind(this), false);

        document.addEventListener('focusin', function(event) {
            event.stopPropagation();
            mainObj.vGMain.readAriaDescribed(event.target, true);
            event.target.style.borderColor = "red";
            window.clearTimeout(this.timeOut);
        }, false);
        document.addEventListener('focusout', function(event) {
            event.stopPropagation();
            event.target.style.borderColor = "";
        }, false);


        /* read header on page launch,then pass speaking to focus event */
        this.vert = 0;
        this.vGMain.readAriaDescribed(y, true);
        this.timeOut = setTimeout(function() {
            mainObj.setFocus(mainObj.items[mainObj.vert]);
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
};