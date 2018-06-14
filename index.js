let express = require('express');
let app = express();

let server = app.listen(4000,() => {
    console.log('Server is running');
});


let uuid = require('uuid/v4');
let io = require('socket.io').listen(server);

let currentScore = 0;




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

