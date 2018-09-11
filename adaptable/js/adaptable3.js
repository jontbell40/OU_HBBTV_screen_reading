var adO3 = {
    /* graphics */
    /* focusable elements */
    items: ["infoArea", "form1", "form2", "submit"],
    formInEditMode: null,
    lastBlurred: null,
    lastFocused: null,
    disableKeyHandler: false,
    pos: 0,
    debug: false,
    popupActive: false,
    keyboardActive: false,
    timeOut: null,

    dPrint: function(x) {
        if (this.debug == true) {
            window.console.log(x)
        }
    },

    keyHandler: function(event) {
        if (mhbbtv.keyset && mhbbtv.keyset.value != mhbbtv.requestedKeys) {
            mhbbtv.keyset.setValue(mhbbtv.requestedKeys);
        }
        try {
            var y = document.activeElement;
            adO3.dPrint("event.keyCode" + event.keyCode);
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
                    window.speechSynthesis.cancel();
                    window.clearTimeout(adO3bj.timeOut);
                    if (adO3.pos <= 3) {
                        if (adO3.pos < 3)
                            adO3.pos = adO3.pos + 1;
                    } else {
                        softKey.keyHandler(event);
                    }
                    break;
                case event.VK_LEFT:
                case KeyEvent.VK_LEFT:
                case KeyEvent.DOM_VK_LEFT:
                    window.speechSynthesis.cancel();
                    window.clearTimeout(adO3bj.timeOut);
                    if (adO3.pos <= 3) {
                        if (adO3.pos === 0)
                            adO3.pos = adO3.pos;
                        else if (adO3.pos <= 3)
                            adO3.pos = adO3.pos - 1;
                    } else {
                        softKey.keyHandler(event);
                    }
                    break;
                case event.VK_DOWN:
                case KeyEvent.VK_DOWN:
                case KeyEvent.DOM_VK_DOWN:
                    if (adO3.pos <= 3) {
                        if (adO3.pos < 3)
                            adO3.pos = adO3.pos + 1;
                    } else {
                        softKey.keyHandler(event);
                    }
                    break;

                case event.VK_UP:
                case KeyEvent.VK_UP:
                case KeyEvent.DOM_VK_UP:
                    if (adO3.pos <= 3) {
                        if (adO3.pos !== 0)
                            adO3.pos = adO3.pos - 1
                    } else {
                        softKey.keyHandler(event);
                    }
                    break;
                case 461:
                    window.clearTimeout(adO3.timeOut);
                    window.open("../index.app", "_self");
                    break;
                case event.YK_ENTER:
                case 13:
                case KeyEvent.DOM_VK_ENTER:
                    var x = document.getElementById(adO3.items[adO3.pos]);
                    var y = document.getElementById("infCont");
                    if (x.className === "submit") {
                        if (adO3.popupActive === false) {
                            adO3.popupShow();
                            adO3.popupActive = true;
                        } else {
                            adO3.popupHide();
                            adO3.popupActive = false;
                        }
                    } else if (x.className === "form") {
                        if (adO3.formInEditMode !== null) {
                            var z = document.getElementById(adO3.formInEditMode);
                            z.style.backgroundColor = "";
                        }

                        adO3.formInEditMode = x.id;
                        x.style.backgroundColor = "Yellow";
                        x.style.color = "black";
                        x.style.borderColor = "";
                        x.blur();
                        document.removeEventListener('keyup', adO3.keyHandler, false);
                        y.style.visibility = "hidden";
                        adO3.keyboardActive = true;
                        softKey.show(adO3.formInEditMode);
                    }
                    break;
                default:
                    return false;
            }
            if (adO3.disableKeyHandler === false) {
                adO3.setFocus(adO3.items[adO3.pos]);
            }
            return true;

        } catch (event) {
            adO3.dPrint("KeyHandler: " + event, 5000);
        }
    },

    setFocus: function(name) {
        if (name) {
            var y = document.getElementById(this.lastFocused);
            var x = document.getElementById(name);
            if (y && y !== x) {
                this.lastBlurred = y.id;
                if (y.className === "submit") {
                    y.style.background = "";
                } else if (y.className = "form") {
                    y.style.borderColor = "";
                }
                y.blur();
            }

            if (x) {
                if (x.className === "submit") {
                    x.style.background = "red";
                } else if (x.className === "form") {

                    x.style.borderColor = "red";
                }
                this.lastFocused = name;
                if (x.className != "submit") {
                    x.focus();
                }
            }
        }
    },


    init: function() {
        var x = document.getElementById(this.items[0]);
        this.vGMain = Object.create(hbbtvSpeak);
        this.vGMain.init();
        this.vGMain.enable = true;
        mhbbtv.init();
        this.createDivForm();
        this.pos = 0;
        softKey.init(adO3.reclaimKey);
        document.addEventListener('keyup', adO3.keyHandler, false);
        document.addEventListener('focusin', adO3.SpeakFocus.bind(this), false);
        softKey.hide();
        x.style.borderColor = "red";
        this.lastFocused = this.items[0];
        x.focus();

    },

    SpeakFocus: function(e) {
        this.dPrint("focus element = " + e.target.id);
        adO3.vGMain.readAriaDescribed(e.target);
    },


    reclaimKey: function() {
        var x = document.getElementById(adO3.items[adO3.pos]);
        var y = document.getElementById("infCont");
        x.style.backgroundColor = "black";
        x.style.color = "white";

        adO3.dPrint("hide called from ad03");
        softKey.hide();
        setTimeout(function() {
            document.addEventListener('keyup', adO3.keyHandler, false);
            adO3.setFocus(adO3.items[adO3.pos]);
        }, 10);
        y.style.visibility = 'visible';

    },


    createDivForm: function() {
        //topdiv just for aria role,may not be required
        //dform
        var top = document.createElement("div");
        top.setAttribute("id", "topForm");
        top.setAttribute("role", "form");

        //dname1
        var a = document.createElement("div");
        var b = document.createTextNode("Name:");
        //form1
        var c = document.createElement("div");
        var d = document.createTextNode("")
        //dname2
        var e = document.createElement("div");
        var f = document.createTextNode("Email:")
        var g = document.createElement("div");
        var h = document.createTextNode("")
        //dname3
        var i = document.createElement("div");
        var j = document.createElement("div");
        var k = document.createTextNode("SUBMIT")

        a.setAttribute("id", "dName1");
        c.setAttribute("id", "form1");
        c.setAttribute("role", "textbox");
        c.setAttribute("aria-label", "Name");

        c.setAttribute("class", "form");
        c.setAttribute("tabindex", "0");


        e.setAttribute("id", "dName2");
        g.setAttribute("id", "form2");
        g.setAttribute("role", "textbox");
        g.setAttribute("aria-label", "Email");

        g.setAttribute("tabindex", "1");
        g.setAttribute("class", "form");


        i.setAttribute("id", "dName3");
        j.setAttribute("id", "submit");
        j.setAttribute("role", "button");
        j.setAttribute("class", "submit");
        j.setAttribute("tabindex", "2");


        //add text elements to forms
        c.appendChild(d);
        g.appendChild(h);
        i.appendChild(k);


        //add forms to div
        a.appendChild(b);
        a.appendChild(c);

        e.appendChild(f);
        e.appendChild(g);

        //add submit
        j.appendChild(k);
        i.appendChild(j);

        top.appendChild(a);
        top.appendChild(e);
        top.appendChild(i);

        document.getElementById('testArea').appendChild(top);

    },

    popupShow: function() {
        var popup = document.createElement("div");
        var form1Content = document.getElementById("form1").innerHTML;
        var form2Content = document.getElementById("form2").innerHTML;
        var mes = document.createTextNode("You entered name: " + form1Content + " And Email: " + form2Content);
        popup.setAttribute("id", "popup");
        popup.setAttribute("role", "alert");
        popup.setAttribute("class", "popup");
        popup.setAttribute("tabindex", "-1");
        popup.setAttribute("zIndex", "2");
        popup.style.display = "inline-block";
        popup.appendChild(mes);
        document.getElementById('midBar').appendChild(popup);
        popup.focus();
    },

    popupHide: function() {
        var form1Content = document.getElementById("popup").innerHTML;
        popup.style.display = "none";
    }



}