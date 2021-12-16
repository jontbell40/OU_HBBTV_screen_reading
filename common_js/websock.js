'use strict';

function HBVG() {
    if (this === window) {
        return new HBVG();
    }
    this.debugEnabled = 1;
    this.webSocket = {};
    this.callbacks = {};
    this.msgId = 0;
}

HBVG.prototype = {
    init: function (server, callbacks) {
        this.callbacks = callbacks;
        this.webSocket = new WebSocket(server);
        this.webSocket.onopen = this.wsOnOpen(this);
        this.webSocket.onerror = this.wsOnError(this);
        this.webSocket.onclose = this.wsOnClose(this);
        this.webSocket.onmessage = this.wsOnMessage(this);
    },
    
    debug: function (str) {
        if (this.debugEnabled === 1) {
            window.console.log(str);
        }
    },
    
    disconnect: function () {
        this.webSocket.close();
    },

    getMessageId: function() {
		var mId = this.msgId++;
		if (this.msgId > 99999999) {
			this.msgId = 0;
		}
		return mId;
    },

    requestSpeak: function (query) {
        var msgId = this.getMessageId(),
	    message = {
		command: 'speak',
		messageId: msgId,
		query: query
	    };
        this.debug(message);
        this.webSocket.send(JSON.stringify(message));
        return msgId;
    },
    
       requestSpeakStop: function () {
        var msgId = this.getMessageId(),
	    message = {
		command: 'speakStop',
		messageId: msgId,
	    };
        this.debug(message);
        this.webSocket.send(JSON.stringify(message));
        return msgId;
       },
    
    /* private functions */
    wsOnOpen: function (scope) {
        return function () {
            /* socket open */
            scope.debug('wsOnOpen');
            if (scope.callbacks.status) {
                scope.callbacks.status('connected');
            }
        };
    },
    
    wsOnError: function (scope) {
        return function () {
            /* socket open */
            scope.debug('wsOnError');
            if (scope.callbacks.status) {
                scope.callbacks.status('error');
            }
        };
    },
    
    wsOnClose: function (scope) {
        return function () {
            /* socket open */
            scope.debug('wsOnClose');
            if (scope.callbacks.status) {
                scope.callbacks.status('close');
            }
        };
    },
    
    wsOnMessage: function (scope) {
        return function (event) {
            var obj;
            try {
                obj = JSON.parse(event.data);
                switch (obj.command) {
                case 'error':
                    scope.debug('Error: ' + obj.message);
                    break;
		 case 'speak':
		  console.log("speak recieved");
		    if (scope.callbacks.onSpeak) {
                        scope.callbacks.onSpeak(obj.speak);
                    }
		    break; 
                default:
                    break;
                }
            } catch (error) {
                window.console.log(error);
            }
        };
    }
};
