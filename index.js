let express = require('express');
let socket = require('socket.io');
let uuid = require('uuid/v4');

let currentScore = 0;

let app = express();
let server = app.listen(4000,() => {
   console.log('Server is running');
});
let io = socket(server);

app.use(express.static('public'));

io.on('connection', function(socket){

    io.sockets.emit('total',{
        total: currentScore
    });

   console.log('socket connected');

   socket.on('score',function (data) {
       console.log(data);
       currentScore++;
       io.sockets.emit('total',{
           total: currentScore
       });
   });

   socket.on('reset',function(data){
       currentScore = 0;

       io.sockets.emit('total',{
           total: currentScore
       });
   });


    socket.on('reset_all',function(data){
        currentScore = 0;

        io.sockets.emit('total',{
            total: currentScore
        });
    });


});

