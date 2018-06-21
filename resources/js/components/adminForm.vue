<template>
        <div class="container form-row">
            <div class="row">
                <div id="adminform" class="columns twelve form-box">

                    <h2 style="text-align: center">Wijzig instellingen</h2>

                    <slot name="message">

                    </slot>

                    <div class="twelve columns">
                        <label for="globalReset">Reset alles</label>
                        <select @change="resetEverything" v-model="globalReset" class="u-full-width" id="globalReset">
                            <option :value="false">Nee</option>
                            <option :value="true">Ja</option>
                        </select>
                    </div>

                    <div class="twelve columns">
                        <label for="setTime">Voer tijd in: {{ this.time }} minuten</label>
                        <input v-model="time" id="setTime" type="range" min="1" max="5" step="0.5">
                    </div>

                    <div class="twelve columns">
                        <label for="allClickReset">Reset alle clicks</label>
                        <select v-model="allClickReset" class="u-full-width" id="allClickReset">
                            <option :value="false">Nee</option>
                            <option :value="true">Ja</option>
                        </select>
                    </div>

                    <div class="twelve columns">
                        <label for="playersReset">Verwijder alle spelers</label>
                        <select v-model="playersReset" class="u-full-width" id="playersReset">
                            <option :value="false">Nee</option>
                            <option :value="true">Ja</option>
                        </select>
                    </div>

                    <div class="twelve columns">
                        <label for="playerClickReset">Verwijder alle speler clicks</label>
                        <select v-model="playerClickReset" class="u-full-width" id="playerClickReset">
                            <option :value="false">Nee</option>
                            <option :value="true">Ja</option>
                        </select>
                    </div>

                    <button @click="saveNewCofig()" :disabled="buttonDisable" class="button-primary">Opslaan <i v-if="buttonDisable" class="fa fa-circle-notch fa-spin"></i></button>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "adminForm",
        data(){
            return {
                globalReset:false,
                allClickReset:false,
                playersReset:false,
                playerClickReset:false,
                time:5,
                buttonDisable: false
            }
        },
        created(){
            this.setupBodyOptions();
            // this.$socket.emit('settings_page');
            this.$socket.on('start_game',() => {
                this.buttonDisable = false;
                this.globalReset =false;
                this.allClickReset = false;
                this.playersReset=false;
                this.allClickReset = false;
                this.playerClickReset = false;
            });

        },
        mounted(){
            let form = document.getElementById('adminform');
            form.addEventListener('change',(e) => {
                this.$socket.emit('settings_page');
            })
        },
        methods:{
            saveNewCofig()
            {
                this.buttonDisable = 'disabled';

                let config = {
                    globalReset: this.globalReset,
                    allClickReset: this.allClickReset,
                    playersReset: this.playersReset,
                    playerClickReset: this.playerClickReset,
                    time: this.time
                };



                this.$socket.emit('setting_save',config);

            },
            resetEverything()
            {
                if(this.globalReset)
                {
                    this.allClickReset = true;
                    this.playersReset = true;
                    this.playerClickReset = true;
                    this.time = 5;
                }
            },
            setupBodyOptions()
            {
                document.body.className = "";
                document.body.classList.add("normal-background");
                document.body.classList.add('with-overflow');
            }

        }
    }
</script>

<style scoped>

</style>