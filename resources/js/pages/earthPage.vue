<template>
    <div>
        <div v-if="changingSettings">
            <div class="container form-row">
                <div class="row">
                    <div class="columns twelve form-box">

                        <h2 style="text-align: center">Spell wordt klaar gezet</h2>

                        <div style="width: 100%" class="flex flex-center">

                            <i style="font-size:5em" class="fa fa-circle-notch fa-spin"></i>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="!limitReached">
                <score title="Total score:">
                    <span slot="score">{{ this.totalScore }}</span>
                </score>
                <h2 style="color: white; position: absolute; right: 0;padding: 0 1em">Spelers: <span>{{ this.players }}</span></h2>
                <earth :style="{backgroundSize: globeStyle}"></earth>
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

                            <h5>Mensen die het meest hebben bijgedrage aan de vernietiging:</h5>

                            <h6 v-for="destroyer in destroyers">{{ destroyer.name }}:   <span>{{ destroyer.score }} hits</span></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Score from '../components/score'
    import Earth from '../components/earth';
    import Progress from '../components/progress';
    export default {
        name: "earthPage",
        data(){
            return {
                totalScore: 0,
                players: 0,
                changingSettings: false,
                time: 300000,
                explosionBusy:true,
                limitReached:false,
                destroyers:[]
            }
        },
        components:{
            Earth,
            Score,
            Progress
        },
        created()
        {
            this.setupBodyOptions();
            this.$socket.on('total_players',(data) => { this.players = data.total });
            this.$socket.on('changing_settings', (data) => { this.changingSettings = true });
            this.$socket.on('total_score', (data) => { this.totalScore = data.total; });

            this.$socket.on('destroyers',(data) => {
                this.destroyers = data.players;
            });

            setTimeout(() => {
                this.limitReached = true;

                this.$socket.emit('earth_destroyed');

                setTimeout(() => {

                    this.explosionBusy = false;
                },3000)
            }, 5000);

        },
        methods:{
            setupBodyOptions()
            {
                document.body.className = "";
                document.body.classList.add("space-background");
                document.body.classList.add('slow-moving-background');
            }
        }
    }
</script>

<style scoped>

</style>