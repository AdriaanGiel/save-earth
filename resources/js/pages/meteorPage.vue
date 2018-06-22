<template>
    <div>
        <div v-if="gameFinished">
            <div class="container form-row">
                <div class="row">
                    <div class="columns twelve box">

                        <h2 style="text-align: center">Loser</h2>

                        <p>Jij hebt bijgedragen aan de vernietiging van de aarde.</p>

                        <img class="box-img" :src="'./img/thumbs_down.png'" alt="Thumbs down">

                        <p>Je bent op de #{{ this.placing }} plaats geeindigd met een score van {{ this.totalScore }}</p>

                    </div>
                </div>
            </div>
        </div>
        <div v-else>


            <div>
                <name-form v-if="showForm" :class="formAnimation"></name-form>

                <div v-else>
                    <div v-if="changingSettings">
                        <div class="container form-row">
                            <div class="row">
                                <div class="columns twelve form-box">

                                    <h2 style="text-align: center">Transmissie komt binnen</h2>

                                    <div style="width: 100%" class="flex flex-center">

                                        <i style="font-size:5em" class="fa fa-circle-notch fa-spin"></i>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <score class="player-hits" title="Hits">
                            <span slot="score">{{ this.totalScore }}</span>
                        </score>

                        <h2 class="player-name" style="">Held: <span>{{ this.hero }}</span></h2>
                        <meteor ></meteor>

                        <spaceship :class="spaceClass"></spaceship>

                    </div>
                </div>


            </div>
        </div>
    </div>


</template>

<script>
    import score from '../components/score';
    import meteor from '../components/meteor';
    import form from '../components/nameForm';
    import Spaceship from '../components/spaceship';

    export default {
        name: "meteorPage",
        data:() => {
            return {
                hero: '',
                username:false,
                formAnimation: '',
                showForm:true,
                totalScore:0,
                changingSettings: false,
                gameFinished:false,
                spaceClass:"",
                placing:0
            }
        },
        components: {
            'score': score,
            'meteor': meteor,
            'name-form': form,
            'spaceship': Spaceship,
        },
        created(){
            this.setupBodyOptions();
            this.checkCookie();
            this.$on('hit',this.addScore);
            this.$on('swipe',this.addSwipeScore);
            this.$socket.on('changing_settings', (data) => {
                this.changingSettings = true;
                this.gameFinished = false;
                this.spaceClass = "";
            });


            this.$socket.on('countdown',this.changeSpaceships);


            this.$socket.on('is_game_halted',(data) => {
                if(data.halted){
                    this.changingSettings = true;
                    this.gameFinished = false;
                    this.spaceClass = "";
                }
            });

            this.$socket.on('reset_score',() => {
               this.totalScore = 0;
               document.cookie = "score=0";
            });

            this.$socket.on('start_game',() => {
                this.changingSettings = false;
                this.gameFinished = false;
                this.spaceClass = "";
            });

            this.$socket.on('destroyers',(data) => {
                this.gameFinished = true;
                this.spaceClass = "";
                this.placing = data.players.findIndex((player) => {
                    return player.id === this.getCookieValue('id');
                }) + 1;
            });

            this.$socket.on('reset_cookies',this.resetCookies);

            this.$on('name-caught',() => {
              this.username = true;
              this.hero = this.getCookieValue('username');
              this.formAnimation = 'animated lightSpeedOut';

              setTimeout(() => {
                  this.showForm = false;
              },1500)
            });
        },
        methods: {
            checkCookie()
            {
                if(this.getCookieValue('username') && this.getCookieValue('username') !== 'empty')
                {
                    this.hero = this.getCookieValue('username');
                    this.showForm = false;
                    let cookieScore = this.getCookieValue('score');

                    this.$socket.emit('reconnecting_player',{
                        id: this.getCookieValue('id')
                    });

                    if(cookieScore)
                    {
                        this.totalScore = Number(cookieScore);
                    }
                }
            },

            setupBodyOptions()
            {
                document.body.className = "";
                document.body.classList.add("space-background");
                document.body.classList.add('moving-background');
            },
            addScore()
            {
                this.totalScore += 10;
                document.cookie = 'score=' + this.totalScore;

                this.$socket.emit('score',{
                    score: this.totalScore,
                    addScore: 10
                });
            },
            addSwipeScore()
            {
                this.totalScore += 100;
                document.cookie = 'score=' + this.totalScore;

                this.$socket.emit('score',{
                    score: this.totalScore,
                    addScore: 100
                });
            },
            getCookieValue(a)
            {
                let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
                return b ? b.pop() : '';
            },
            resetCookies()
            {
                this.totalScore = 0;
                this.showForm = true;
                this.formAnimation = '';
                document.cookie = "username=empty";
                document.cookie = "id=empty";
                document.cookie = "score=empty";
            },
            changeSpaceships(data)
            {
                let array = [
                  'moveLeft', 'moveRight', 'moveLeftAndUp', 'moveLeftAndDown'
                ];
                let random = Math.floor(Math.random() * array.length);
                switch (data.countdown){
                    case "00:04:00":
                        console.log('alien');
                        this.spaceClass = "spaceship alien " + array[random];
                        break;
                    case "00:03:20":
                        this.spaceClass = "spaceship saiyan " + array[random];
                        break;

                    case "00:03:00":
                        this.spaceClass = "spaceship frieza " + array[random];
                        break;

                    case "00:02:20":
                        this.spaceClass = "spaceship animated bounce rick " + array[random];
                        break;

                    case "00:01:30":
                        this.spaceClass = "spaceship saiyan " + array[random];
                        break;

                    case "00:00:30":
                        this.spaceClass = "spaceship alien " + array[random];
                        break;

                    case "00:00:03":
                        this.spaceClass = "spaceship earth earthImpact";
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>