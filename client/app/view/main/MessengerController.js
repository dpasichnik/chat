/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('chat.view.main.MessengerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.messenger',

    /**
     * @method onTextChange
     * Changes textarea height depending on its content size but restricted to maxHeight
     */
    onTextChange: function (cmp, newValue, oldValue) {
        var textarea = cmp.el.down('textarea'),
            maxHeight = (cmp.getMaxHeight() != null)?cmp.getMaxHeight():200;
        if (textarea.dom.scrollHeight > cmp.getHeight() && textarea.dom.scrollHeight < maxHeight){
            cmp.setHeight(textarea.dom.scrollHeight + 5);
        }
    },
    /**
     * @method onKeyPress
     * Handles typing in messenger textarea
     * It sends data on Enter key press
     */
    onKeyPress: function(cmp, e){
        var me = this;
        if (e.keyCode == e.ENTER){
            e.preventDefault();
            var store = Ext.getStore('messages');
            var msg = cmp.getValue();
            var username = chat.getApplication().nickname;
            var record = new chat.app.model.Message({ msg: msg, username:username});
            store.add(record);
            cmp.inputElement.dom.value = '';
            me.syncScroll();
        }
    },
    /**
     * @method syncScroll
     * Scroll down the messenger window to show lately added records
     */
    syncScroll: function(){
        var scroller = Ext.ComponentQuery.query('app-messenger dataview')[0].bodyElement;
        scroller.scrollBy(0,scroller.dom.scrollHeight);
    },
    /**
     * @method onRender
     * Initialize socket.io broadcast event to add records from other chatters after component is rendered
     */
    onRender: function(cmp, e){
        var me = this;
        var socket = Ext.direct.Manager.getProvider('socketio').socket;
        socket.on('Message broadcast', function(msg){
            var store = Ext.getStore('messages');
            var record = new chat.app.model.Message(msg);
            store.add(record);
            me.syncScroll();
        });
    }

});
