Ext.direct.Manager.addProvider({
    id          : 'providerid',
    type        : 'socketio',
    namespace   : 'Socket',
    url         : 'localhost:8080',
    opts        : {
        reconnection: false,
        multiplex   : false
    },
    actions     : {
        Location: [
            {
                name: 'read',
                params: ['page', 'start', 'limit']
            },
            {
                name: 'add',
                params: ['name'],
                strict: false
            }
        ]
    }
});

socket.on('Location.add', function(req, res){

    console.log(req.data.name); // Romania

    res({
        type    : req.type,
        tid     : req.tid,
        action  : req.action,
        method  : req.method,
        data    : [
            {
                success: true
            }
        ]
    });
});

socket.on('Location.read', function(req, res){

    console.log(req.data.page); // 1

    res({
        type    : req.type,
        tid     : req.tid,
        action  : req.action,
        method  : req.method,
        data    : [
            {
                id  : '123',
                name: 'Blabla'
            }
        ]
    });
});

Socket.Location.add({name: 'Romania'}, function(result){

    // console.log(result);

});

Ext.define('Location', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'name',
            type: 'string'
        }
    ],

    proxy: {
        type: 'direct',
        api : {
            read: 'Socket.Location.read'
        }
    }
});


Ext.define('Locations', {

    extend: 'Ext.data.Store',

    alias: 'store.locations',

    model: 'Location'
});


var socket = Ext.direct.Manager.getProvider('providerid').getSocket();

socket.on('connect_error', function(){ // code });

socket.on('error', function(){ // code });