/*
* SocketIO Ext.Direct provider
* */
Ext.define('chat.proxy.SocketIoProvider', {

    extend  : 'Ext.direct.RemotingProvider',

    alias   : 'direct.socketioprovider',

    type    : 'socketio',

    enableBuffer: false,
    /**
     * @method doConnect
     * Connect to the socket
     */
    doConnect: function(){

        console.info('connect');
        if( !Ext.isDefined(io) ){
            Ext.raise('The io global is missing. Forgot to load /socket.io/socket.io.js?');
            return;
        }

        var url = this.url,
            opts = this.opts;

        this.socket = io(url, opts);

        this.callParent(arguments);
    },
    /**
     * @method doDisconnect
     * Disconnect from socket
     */
    doDisconnect: function(){

        if( !this.socket ){
            return;
        }

        this.socket.disconnect();
    },
    /**
     * @method getSocket
     * Return socket
     */
    getSocket: function(){

        return this.socket;
    },
    /**
     * @method sendTransaction
     * Create an Ajax request out of transaction and send it to the server
     *
     * @param {Object/Array} transaction The transaction(s) to send
     */
    sendTransaction: function(transaction){

        if( !this.socket ){
            return;
        }

        var key = transaction.action + ' ' + transaction.method,
            payload = this.getPayload(transaction);

        this.socket.emit(key, payload, this.onData.bind(this));
    },
    /**
     * @method onData
     * React to the ajax request being completed
     *
     * @param {Object/Array} response The response of request
     */
    onData: function(response){
        var event = this.createEvent(response),
            transaction = this.getTransaction(event);

        this.fireEvent('data', this, event);

        if( transaction && this.fireEvent('beforecallback', this, event, transaction) !== false ){
            this.runCallback(transaction, event, true);
        }

        Ext.direct.Manager.removeTransaction(transaction);
    }
});