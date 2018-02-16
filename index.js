var express         = require('express');
var app             = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const Sequelize = require("sequelize");
/**
 * Configure Mysql connection
 * mysql://username:password:server:port/database
 * */
const sequelize = new Sequelize('mysql://root:@localhost:3306/chat');

sequelize.authenticate().then(function() {
        console.log('Connection successfully made.');
    }).catch(function() {
        console.error('Error connecting to database', err);
    });
const Message = sequelize.define('message', {
    id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: Sequelize.STRING,
    msg: Sequelize.TEXT,
    date: Sequelize.BIGINT
}, {
    timestamps: false
});

//sequelize.query('SELECT * FROM messages', { model: Message }).then(function(msgs){

//    console.info(msgs);
//})


app.use(express.static(__dirname+"\\client"));

// redirecting to home page
app.get('/', function (req, res) {
    res.sendFile(__dirname+"\\client\\index.html");
})

var getMessages = function(req, res) {
    Message.findAll({raw: true}).then(function (msgs) {
        res({
            type: req.type,
            tid: req.tid,
            action: req.action,
            method: 'read',
            data: msgs
        });
    });
}

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('Message create', function(req, res){

        console.log('Message Add');
        var data = req.data;
        delete data.date;
        delete data.id;
        Message.create(data).then(function(msg){
            var data = msg.get({ plain: true });
            socket.broadcast.emit('Message broadcast', data);
            res({
                type: req.type,
                tid: req.tid,
                action: req.action,
                method: req.method,
                data: data
            });
        });
    });

    socket.on('Message read', function(req, res){
        console.log('Message read');
        getMessages(req, res);
    });
    socket.on('Message update', function(req, res){
        console.log('Message update');
        console.log(req.data.page); // 1

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
    socket.on('Message destroy', function(req, res){
        console.log('Message destroy');
        console.log(req.data.page); // 1

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
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});