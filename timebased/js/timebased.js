var tbObj = {
    /* graphics */
    /* focusable elements */
    items: ["infoArea", "video"],
    lastBlurred: null,
    nowFocused: null,
    video: null,
    playButton: null,
    muteButton: null,
    fullScreenButton: null,
    seekBar: null,
    timeout: null,
    isPlaying: false,
    vGMain: null,
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
        var inf = document.getElementById('infoArea');
        var vid = document.getElementById('video');
        var test = document.getElementById('testArea');
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
                    break;

                case event.VK_GREEN:
                case KeyEvent.VK_GREEN:
                case KeyEvent.DOM_VK_GREEN:
                    break;

                case KeyEvent.DOM_VK_RIGHT:
                    window.clearTimeout(this.timeOut);
                    test.style.borderColor = "red";
                    inf.style.borderColor = "black";
                    vid.focus();
                    break;

                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    inf.style.borderColor = "red";
                    test.style.borderColor = "black";
                    inf.focus();
                    break;

                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    break;

                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    break;

                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    if (this.isPlaying == false) {
                        vid.play();
                        this.isPlaying = true;
                    } else {
                        this.isPlaying = false;
                        vid.pause();
                    }
                    break;

                case 415:
                    vid.play();
                    break;

                case 19:
                    vid.pause();
                    break;

                case 461:
                    window.clearTimeout(this.timeOut);
                    this.dPrint("Green key");
                    window.open("../index.app", "_self");
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


        for (var a = 0; a < this.items.length; a++) {
            var t = document.getElementById(this.items[a]);
            t.addEventListener('focusin', function(event) {
                event.stopPropagation();
                tbObj.vGMain.readAriaDescribed(event.target, true);
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
            tbObj.setFocus(tbObj.items[0]);
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