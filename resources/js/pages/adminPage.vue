<template>
    <admin-form>

        <div slot="message">
            <div class="twelve columns message-box paused" v-if="stopped">
                <h6 style="text-align: center">Spel moet gestart worden</h6>
                <table class="u-full-width">
                    <tbody>
                        <tr>
                            <td>Spelers</td>
                            <td>Totaal hits</td>
                            <td>Tijd</td>
                        </tr>
                        <tr>
                            <td>{{ this.players }}</td>
                            <td>{{ this.score }}</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="twelve columns message-box in-progress">
                <h6 style="text-align: center">Spel is bezig</h6>
                <table class="u-full-width">
                    <tbody>
                    <tr>
                        <td>Spelers</td>
                        <td>Totaal hits</td>
                        <td>Tijd</td>
                    </tr>
                    <tr>
                        <td>{{ this.players }}</td>
                        <td>{{ this.score }}</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </admin-form>
</template>

<script>
    import adminForm from '../components/adminForm';
    export default {
        name: "adminPage",
        data(){
            return {
                stopped: true,
                players: 0,
                score: 0
            }
        },
        components:{
            "admin-form": adminForm
        },
        created(){
            this.$socket.on('game_start',() => {
               this.stopped = false;
            });
            this.$socket.on('total_players',(data) => { this.players = data.total; console.log(this.players)});
            this.$socket.on('total_score', (data) => { this.score = data.total; });

        }
    }
</script>

<style scoped>

</style>