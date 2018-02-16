/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('chat.Application', {
    extend: 'Ext.app.Application',

    name: 'chat',
    profiles: [
        'Desktop',
        'Tablet',
        'Phone'
    ],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    launch: function(){
        var me = this;
        Ext.direct.Manager.addProvider({
            id          : 'socketio',
            type        : 'socketio',
            namespace   : 'Socket',
            url         : 'localhost:3000',
            opts        : {
                reconnection: false,
                multiplex   : false
            },
            actions     : {
                Message: [
                    {
                        name: 'read',
                        params: ['page', 'start', 'limit']
                    },
                    {
                        name: 'create',
                        strict: false
                    },
                    {
                        name: 'update',
                        strict: false
                    },
                    {
                        name: 'destroy',
                        strict: false
                    }
                ]
            }
        });
        Ext.Msg.prompt('Nick Name', 'Please enter your nickname:', function(btn, name) {
            if (name == ''){
                name = 'Unnamed';
            }
            me.nickname = name;
            var dataview = Ext.ComponentQuery.query('app-messenger')[0].down('dataview');
            dataview.refresh();
        });
    }
});
