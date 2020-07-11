var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
const socket = require('socket.io');


require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');
const { user } = require('./app/config/db.config.js');


db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync with { force: false }');
});


var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})


var io = socket(server);

io.on('connection', function(socket) {
    //console.log('socket bağlantısı yapıldı', socket.id);
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
    socket.on('yaziyor',function (data) {
        socket.broadcast.emit('yaziyor',data);
    })
});

