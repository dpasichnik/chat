# Dmitry Pasichnik test task
This is my test task for the chat application using ExtJS 6.5 universal app with modern package as client and NodeJS+Express+Socket.io+mySQL as a backend

# Requirements
- Sencha CMD 6.5
- ExtJS 6.5+ (may work with 6.2)
- NodeJs
    - Express
    - SocketIO
    - Sequelize
- MySQL


# Installation
Install NodeJS
Install packages:
```javascript
npm install express
npm install socket.io
npm install sequelize
```
Open index.js and configure mySql connection at line 11

Create this mysql table

```
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `msg` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

Place ExtJS framework into ext folder at /client

# Usage

Run server

```javascript
node index.js
```

Run chat application

```javascript
http://localhost:3000/
```

# Features

The application is developed as universal using Extjs Modern package. It is simplifies developing of the project for all devices (desktop, tablet, phone) in the same place with mobile ready components.

MVVM approach has been selected for current task.

To connect client with server via Socket.IO the Ext.Direct.Manager was used and SocketIO provider added. You can configure it  here /client/app/Application.js in launch method

```javascript
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
```


SocketIO provider is defined in /client/app/proxy/ folder

```javascript
Ext.define('chat.proxy.SocketIoProvider', {
    extend  : 'Ext.direct.RemotingProvider',
    alias   : 'direct.socketioprovider',
    type    : 'socketio',
    enableBuffer: false,

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

    doDisconnect: function(){
        if( !this.socket ){
            return;
        }

        this.socket.disconnect();
    },

    getSocket: function(){
        return this.socket;
    },

    sendTransaction: function(transaction){
        if( !this.socket ){
            return;
        }

        var key = transaction.action + ' ' + transaction.method,
            payload = this.getPayload(transaction);

        this.socket.emit(key, payload, this.onData.bind(this));
    },

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
```

Messenger View located at /app/view/main/Messenger.js  and can be styled via Messenger.scss file.  The view is using MessengerController (view controller) to handle actions and MessengerModel (view model) to keep store.