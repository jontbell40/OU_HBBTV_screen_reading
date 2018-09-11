var hbbtvSpeak = {
    enable: true,
    default_voice: null,
    spkArr: null,
    arrLen: 0,
    spkTimer: null,
    debug: true,
    voices: null,
    speaking: false,
    paused: false,
    muttr: null,
    parameters: null,
    onEndEnabled: true,
    voiceList: null,
    myevent: new CustomEvent(
	"speakEnd", 
	{
		detail: {
			message: "speech stopped",
			time: new Date(),
		},
		bubbles: true,
		cancelable: true
	}),
    escapable: /[\\\"\x00-\x1f\x7f-\uffff]/g,
    meta: { // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    },
    /* address of laptop to connect to on local network */
    SERVER_ADDRESS:"192.168.1.169",
    //SERVER_ADDRESS:"192.168.1.126",
    //SERVER_ADDRESS:"10.10.10.155",
    callbacks: {
	onSpeak: function (speak) {
	    var text;
	    window.console.log("Speak Response");
	    if(speak === 1)
	    {
		document.dispatchEvent(hbbtvSpeak.myevent);
		//need to create onEnd event
		window.console.log("Speech finished");
	    }
	},
	onSpeakStop: function (speak) {
	    var text;
	    window.console.log("Speech  Response");
	    if(speak === 1)
	    {
		window.console.log("Speech Stopped");
	    }
	}
    },
    fvcd : null,
    

    webSocketSpeak: function(x){
	if(this.fvcd)
	this.fvcd.requestSpeak(x);
    },

    webSocketSpeakStop: function(x){
	if(this.fvcd)
	this.fvcd.requestSpeakStop();
    },
	
    mquote: function(str) {
        this.escapable.lastIndex = 0;
        return this.escapable.test(str) ?
            '"' + str.replace(this.escapable, function(a) {
                var c = hbbtvSpeak.meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + str + '"';
    },

    voiceStartCallback: function() {
        console.log("Voice started");
    },

    voiceEndCallback: function() {
        document.dispatchEvent(this.myevent);
        console.log("Voice ended");
    },

    init: function() {
	this.fvcd = new FVCD();
	this.fvcd.init("ws://" + this.SERVER_ADDRESS + ":57710/", this.callbacks);
	setTimeout(function(){
	    window.console.log("set websocket")
	}, 1000);
    },


    dPrint: function(x) {
        if (this.debug === true) {
            window.console.log(x);
        }
    },

	

    /* read the info fields presented in the tests */
    readInfo: function(z, sp) {
        for (var i = 0; i < z.childNodes.length; i++) {
            /* take everything other than text nodes */
            this.dPrint("nodeType = " + z.childNodes[i].nodeType);
            this.dPrint("nodeName = " + z.childNodes[i].nodeName);
            if (z.childNodes[i].nodeType !== 3) {
                if (z.childNodes[i].nodeName === 'P') { /* for paragraphs find only text, ignore </br> should we add a pause?*/
                    this.dPrint("p node found");
                    this.dPrint("nodes length = " + z.childNodes[i].childNodes.length);
                    for (var x = 0; x < z.childNodes[i].childNodes.length; x++) {
                        if (z.childNodes[i].childNodes[x].nodeName === "#text") {
                            // sp+= z.childNodes[i].childNodes[x].innerHTML;
                            if (z.childNodes[i].childNodes[x].data.length > 0) {
                                this.dPrint("p text found = " + z.childNodes[i].childNodes[x].data);
                                sp += z.childNodes[i].childNodes[x].data.valueOf();
                                //  sp += " ";
                            }
                        }
                    }
                } else if (z.childNodes[i].nodeName === 'DIV') {
                    /* drill down recursively */
                    this.dPrint("DIV found");
                    sp += this.readInfo(z.childNodes[i], sp);
                } else if (z.childNodes[i].nodeName === 'H1') {
                    this.dPrint("H1 found");
                    sp += z.childNodes[i].innerHTML;
                    sp += " ";

                } else if (z.childNodes[i].nodeName === 'H2') {
                    this.dPrint("H2 found");
                    sp += z.childNodes[i].innerHTML;
                    sp += " ";

                } else if (z.childNodes[i].nodeName === 'H3') {
                    sp += z.childNodes[i].innerHTML;
                    sp += " ";
                    this.dPrint("H3 found");

                } else if (z.childNodes[i].nodeName === 'H4') {
                    sp += z.childNodes[i].innerHTML;
                    sp += " ";
                    this.dPrint("H4 found");

                }
            }
        }

        return sp;
        /* for tv until onEnd id fixed */
    },

    /* 
       The chunker, splits a text field into an array, this speaks the array based on time to solve the problem
       with the TV event failure.
    */

    speakArrayByTime: function() {
        if (this.spkArr) {
            this.dPrint("speakChunkCalled");
            this.dPrint("speakChunkCalled:length" + this.spkArr.length);
            if (this.spkArr.length >= 1) {
                var mtime = this.spkArr[0].length * 76;
                this.dPrint(mtime + "");
                this.dPrint(this.spkArr[0]);
                window.console.log("js:" + this.spkArr[0]);
                this.readTxt(this.spkArr[0] + "", true);
                this.spkArr.shift();
                this.spkTimer = setTimeout(this.speakArrayByTime.bind(this), mtime);
            }
        }
    },



    speakChunk: function(obj, need_cancel) {
        this.dPrint("speakChunkCalled");
        if (this.enable === false) {
            return;
        }
        if (need_cancel) {
            clearTimeout(hbbtvSpeak.spkTimer);
	    this.webSocketSpeakStop();
        }
        if (obj != null) {
            if (typeof obj === 'string') {
                if (this.spkArr != null)
                    this.spkArr.length = 0;
                this.spkArr = obj.split('.');
                this.speakArrayByTime();
            }
        }
    },

    /* non timed, using onEnd not presently working on test TV */
    speakArray: function() {
        if (this.spkArr.length >= 1) {
            if (typeof muttr.text === 'string') {
                if (this.spkArr.length >= 1) {
                    this.dPrint("speak:" + this.spkArr[0]);
                    document.addEventListener('speakEnd', function() {
                        hbbtvSpeak.dPrint("end received");
                        if (hbbtvSpeak.spkArr.length >= 1)
                            hbbtvSpeak.speakArray();
			mainObj.speaking = false;
                    });
                    window.console.log("send to responsive =" + this.spkArr[0]);
		    this.webSocketSpeak(this.spkArr[0]);
               
		    
                    this.spkArr.shift();
                }
            }
        }
    },


    speakChunkOnEnd: function(obj, need_cancel) {
        hbbtvSpeak.dPrint("speakChunkCalled");
        if (hbbtvSpeak.enable === false) {
            return;
        }
        if (need_cancel) {
            this.webSocketSpeakStop();
        }
        hbbtvSpeak.spkArr = obj.split('.');

        hbbtvSpeak.speakArray();
    },


    speakStop: function() {
        window.console.log("Speech finished");
    },
    speakStart: function() {
        window.console.log("Speech start");
    },

    cancel: function() {
        // this.spkArr = null;
        this.webSocketSpeakStop();

    },

    readTxt: function(x, cancel) {
        if (cancel)
            this.webSocketSpeakStop();
        this.webSocketSpeak(x);
    },

    readAriaDialog: function(t) {
        this.cancel();
        var sp = "";
        sp = this.readInfo(t, sp);

        if (this.onEndEnabled === true)
            this.speakChunkOnEnd(sp, true);
        else
            this.speakChunk(sp, true);
    },

    readAriaLink: function(t) {
        this.cancel();
        if (t.innerText !== "") {
            this.readTxt(t.innerText + " Press OK to Select.", true);
            this.dPrint("Link:" + t.innerText + " Press OK to select");
        }
    },

    readAriaButton: function(t) {
        this.cancel();
        if (t.innerText !== "") {
            this.readTxt(t.innerText + " Press OK to Select.", true);
            this.dPrint("button:" + t.innerText + " Press OK to select");
        }
    },

    readAriaAlert: function(t) {
        this.cancel();
        if (t.innerText !== "") {
            this.readTxt(t.innerText + "Press OK to close this message", true);
            this.dPrint("button:" + t.innerText + " Press OK to close the message");
        }
    },

    readAriaTextBox: function(t) {
        this.cancel();
        var x = t.getAttribute("aria-label");
        if (x) {
            this.readTxt("Form input for " + x + "Press Ok to enter edit mode", true);
            this.dPrint("Form input name " + x);
        }
    },



    readAriaHeader: function(x) {
        if (x) {
            if (x.getAttribute("aria-label")) {
                this.dPrint("Got attribute" + x.getAttribute("aria-label"));
                if (x.getAttribute("aria-label")) {
                    this.readTxt(x.getAttribute("aria-label"), true);
                }
            } else if (x.getAttribute("aria-labelled-by")) {
                var t = document.getElementById(x.getAttribute("aria-labelled-by"));
                this.readTxt(t.innerHTML, true);
            } else {
                var y = x.childElementCount;
                if (y > 0) {
                    this.dPrint("child node length" + y.length);
                    var b = x.getElementsByTagName("h1");
                    if (b && b.length > 0) {
                        this.readTxt(b[0].innerHTML, true);
                    } else {
                        var c = x.getElementsByTagName("h2");
                        if (c && c.length > 0) {
                            this.readTxt(c[0].innerHTML, true);
                        } else {
                            var d = x.getElementsByTagName("h3");
                            if (d && d.length > 0)
                                this.readTxt(d[0].innerHTML, true);
                            else {
                                var e = x.getElementsByTagName("h4");
                                if (e && e.length > 0)
                                    this.readTxt(e[0].innerHTML, true);
                            }
                        }
                    }
                }
            }
        }
    },

    readAriaArticle: function(x) {
        if (x) {
            var str = "";
            var dbList = x.getAttribute("aria-describedby").split(",");
            if (x.getAttribute("aria-describedby")) {
                this.dPrint("described list:" + x.getAttribute("aria-describedby"));
                window.console.log("described list:" + x.getAttribute("aria-describedby"));

                if (dbList.length > 0) {
                    window.console.log("db length " + dbList.length);
                    for (var i = 0; i < dbList.length; i++) {
                        var ele = document.getElementById(dbList[i])
                        if (ele) {
                            str = str + " " + ele.innerText;
                        }

                    }
                    this.readTxt("" + str, true);
                    window.console.log("str: " + str);
                }
            }

        }
    },

    /* aria supporting functions */
    readAriaDescribed: function(tnode, cancel) {

        if (cancel === true) {
            this.cancel();
        }

        var role = this.getRole(tnode);
        if (role) {
            this.dPrint("Role =" + role);
            if (role === "dialog") {
                this.readAriaDialog(tnode);
            } else if (role === "link") {
                this.readAriaLink(tnode);
            } else if (role === "header") {
                this.readAriaHeader(tnode);
            } else if (role === "article") {
                this.readAriaArticle(tnode)
            } else if (role === "button") {
                this.readAriaButton(tnode);
            } else if (role === "alert") {
                this.readAriaAlert(tnode);
            } else if (role === "textbox") {
                this.readAriaTextBox(tnode);
            } else {
                this.dPrint("Role =" + role + "No handler.");
            }

        } else
            this.dPrint("role not found");
    },


    getRole: function(t) {
        var role = null;
        role = t.getAttribute("role");
        if (role) {
            return role;
        }
        return null;
    }

};
