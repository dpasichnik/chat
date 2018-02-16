Ext.define('chat.app.model.Message', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'msg',
            type: 'string'
        },
        {
            name: 'date',
            type: 'date'
        }
    ],

    proxy: {
        type: 'direct',
        api : {
            create  : 'Socket.Message.create',
            read    : 'Socket.Message.read',
            update  : 'Socket.Message.update',
            destroy : 'Socket.Message.destroy'
        }
    }
});