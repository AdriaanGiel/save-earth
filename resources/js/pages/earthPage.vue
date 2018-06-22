<template>


    <div>
        <div v-if="changingSettings">
            <div class="container form-row">
                <div class="row">
                    <div class="columns twelve form-box">
                        <div class="row">
                            <div class="columns six flex flex-column qr-box">
                                <img :src="'./img/qr-code.jpeg'" alt="QR-code">
                                <h4>earth.adriaangiel.me</h4>
                            </div>

                            <div class="columns six flex flex-column player-box">
                                <h3>Spelers: <span>{{ this.totalPlayers }}</span></h3>
                                <div class="player-list">
                                    <ul v-if="players.length > 0">
                                        <li v-for="player in players">
                                            {{ player.name }}
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li>Er zijn nog geen spelers.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="!limitReached">
                <div class="flex flex-row feedback-bar">
                    <score title="Totaalscore:">
                        <span slot="score">{{ this.totalScore }}</span>
                    </score>
                    <h2 :class="timeClass + ' player-feedback flex-fill text-center'">{{ this.timeValue }}</h2>
                    <h2 class="player-feedback flex-fill text-center">Spelers: <span>{{ this.totalPlayers }}</span></h2>
                </div>

                <earth :class="earthClass" :style="{transition: globeTransition,backgroundSize: backgroundSizeGlobe}"></earth>
                <div id="meteor-object" class="flex-center flex">
                    <img :src="`./img/meteor.gif`" alt="meteor">
                </div>
            </div>
            <div v-else-if="limitReached && explosionBusy">
                <img style="height: 80vh; width: auto" :src="'./img/explosion-1.gif'" alt="">
            </div>

            <div v-else>
                <div class="container form-row">
                    <div class="row">
                        <div class="columns twelve form-box">

                            <h2 style="text-align: center">Losers</h2>
                            <h4>De aarde is vernietigd</h4>

                            <h5>Mensen die het meest hebben bijgedragen aan de vernietiging:</h5>

                            <table style="margin: 0 auto">
                                <thead>
                                    <tr>
                                        <td>Plaats</td>
                                        <td>Naam</td>
                                        <td>Score</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(destroyer, index) in destroyers">
                                        <td>#{{ index + 1}}</td>
                                        <td>{{ destroyer.name }}</td>
                                        <td>{{ destroyer.score }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Score from '../components/score';
    import Earth from '../components/earth';
    import Spaceship from '../components/spaceship';

    export default {
        name: "earthPage",
        data(){
            return {
                totalScore: 0,
                totalPlayers: 0,
                players:[],
                changingSettings: false,
                earthClass:"",
                time: 300000,
                explosionBusy:true,
                limitReached:false,
                destroyers:[],
                timer: new Timer(),
                timeValue:{},
                timeClass: "",
                backgroundSizeGlobe:"",
                sound:{}
            }
        },
        computed: {
            globeTransition()
            {
                return "background-size "+ this.time +"ms ease-in";
            }
        },
        components:{
            Earth,
            Score,
            Spaceship
        },
        created()
        {
            this.sound = new Howl({
                src: './audio/meteor.mp3',
                loop:true,
                volume: 0.4
            });
            // this.timeValue = e.detail.timer.getTimeValues().toString();

            this.$socket.on('is_game_halted',(data) => {
                if(data.halted){
                    this.changingSettings = data.halted;
                    this.timeClass = "";
                }else{
                    sound.play();
                    sound.volume = 1;
                }
            });
            this.setupBodyOptions();
            this.$socket.on('total_players',(data) => {
                this.totalPlayers = data.total;
                this.players = data.players;

            });
            this.$socket.on('changing_settings', (data) => {
                this.changingSettings = true;
                this.earthClass = '';
                this.timeClass = "";
            });
            this.$socket.on('total_score', (data) => { this.totalScore = data.total; });

            let growTimer;
            this.$socket.on('start_game',(data) => {

                this.sound.play();
                this.changingSettings = false;
                this.time = data.time;
                this.limitReached = false;
                this.explosionBusy = true;

                setTimeout(() => {
                    this.earthClass = "grow";
                },500);


                this.timer.removeEventListener('secondsUpdated',this.updateTimer,true);
                this.timer = new Timer();

                this.timer.start({countdown: true, startValues: {seconds: this.time / 1000}});
                this.timer.addEventListener('secondsUpdated',this.updateTimer,true);

                this.timeValue = this.timer.getTimeValues().toString();

                growTimer = setTimeout(() => {
                    this.limitReached = true;
                        this.sound.stop();

                        let explosion = new Howl({
                           src: './audio/explosion.mp3',
                           loop: false,
                           volume: 0.6
                        });

                        explosion.play();

                        this.$socket.emit('earth_destroyed');
                        setTimeout(() => {
                            this.explosionBusy = false;
                        },2000)
                },this.time);
            });

            this.$socket.on('changing_settings',() => {
                this.earthClass = "";
                this.backgroundSizeGlobe = "1%";
                clearTimeout(growTimer);
                this.timer.stop();
            });


            this.$socket.on('destroyers',(data) => {
                this.earthClass = "";
                this.backgroundSizeGlobe = "1%";
                this.destroyers = data.players;
            });

        },
        methods:{
            setupBodyOptions()
            {
                document.body.className = "";
                document.body.classList.add("space-background");
                document.body.classList.add('slow-moving-background');
            },
            updateTimer(e)
            {
                if(!this.changingSettings)
                {
                    this.timeValue = e.detail.timer.getTimeValues().toString();
                    if(this.timeValue === "00:01:00" || this.timeValue.includes("00:00")){
                        this.timeClass = "animated infinite pulse timer-danger";
                    }
                    this.$socket.emit('timer_change',{
                        timer:this.timeValue
                    })
                }else{
                    this.timeClass = "";
                }

            }
        }
    }
</script>

<style scoped>

</style>