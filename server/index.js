let config = require('../config');
let express = require('express');
let app = express();
let history = require('connect-history-api-fallback');

let currentScore = 0;
let all_players = [];

let server = app.listen(config.port,() => {
    console.log('Server is running');
});

let io = require('socket.io').listen(server);

app.use(history());
app.use(express.static('../public'));


io.on('connection', function(socket){
    sendTotalScore();
    sendTotalPlayers();

    socket.on('earth_destroyed',() => {
        io.sockets.emit('destroyers',{players:all_players});
    });

    socket.on('settings_page', () => {
       io.sockets.emit('changing_settings');
    });


    socket.on('disconnect', function () {
        all_players = all_players.map((player) => {
            if(player.socketId === socket.id)
            {
                player.socketId = '';
            }
            return player;
        });
        sendTotalPlayers()
    });



    socket.on('reconnecting_player', function (data) {
        all_players = all_players.map((player) => {
            if(player.id === data.id)
            {
                player.socketId = socket.id;
            }
            return player;
        });

        sendTotalPlayers();
    });


    socket.on('add_player', function (data) {
       let exists = all_players.find((p) => {
          return p.id === data.id;
       });

       if(typeof exists === "undefined")
       {
           let player = {
               id: data.id,
               name: data.name,
               score: data.score,
               socketId: socket.id
           };
           all_players.push(player);
           sendTotalPlayers();
       }
    });

   socket.on('score',function (data) {
       all_players = all_players.map((player) => {
           if(player.socketId === socket.id){
                player.score = data.score
            }
           return player;
       });
       currentScore++;
       sendTotalScore();
   });

   socket.on('setting_save',(data) => {
       if(data.globalReset)
       {
           reset_everything();

       }else{
           if(data.allClickReset)
           {
               resetClicks();
           }
           if(data.playersReset)
           {
               reset_all_players();
           }
           if(data.time)
           {

           }

       }
   });


   socket.on('reset',function(data){
       resetClicks();
   });

   socket.on('reset_players', function (data) {
      reset_all_players();
   });

    socket.on('reset_all',function(data){
        reset_everything();
    });
});

function reset_all_players()
{
    all_players = [];
    sendTotalPlayers();
    console.log('sadas');
    io.sockets.emit('reset_cookies');
}

function reset_everything()
{
    currentScore = 0;
    all_players = [];
    reset_all_players();
    sendTotalScore();
    sendTotalPlayers();
}

function resetClicks()
{
    currentScore = 0;
    all_players = all_players.map((player) => {
        player.score = 0;
        return player;
    });

    sendTotalScore();
}

function sendTotalScore()
{
    io.sockets.emit('total_score',{
        total: currentScore
    });
}


function sendTotalPlayers()
{
    io.sockets.emit('total_players',{
        total: all_players.filter((p) => {
            return p.socketId !== '';
        }).length,
        players: all_players
    });
}
