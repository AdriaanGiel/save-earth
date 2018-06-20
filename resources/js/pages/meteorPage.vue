<template>
    <div>
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
            <name-form v-if="showForm" :class="formAnimation"></name-form>

            <div v-else>
                <score title="Hits">
                    <span slot="score">{{ this.totalScore }}</span>
                </score>
                <h2 style="color: white; position: absolute; right: 0;padding: 0 1em">Held: <span>{{ this.hero }}</span></h2>
                <meteor ></meteor>


            </div>

        </div>
    </div>

</template>

<script>
    import score from '../components/score';
    import meteor from '../components/meteor';
    import form from '../components/nameForm';
    import Progress from '../components/progress';
    export default {
        name: "meteorPage",
        data:() => {
            return {
                hero: '',
                username:false,
                formAnimation: '',
                showForm:true,
                totalScore:0,
                changingSettings: false
            }
        },
        components: {
            'score': score,
            'meteor': meteor,
            'name-form': form,
            'progress': Progress
        },
        created(){
            this.setupBodyOptions();
            this.checkCookie();
            this.$on('hit',this.addScore);
            this.$socket.on('changing_settings', (data) => { this.changingSettings = true });

            this.$socket.on('start_game',() => this.changingSettings = false);

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
                        this.totalScore = cookieScore;
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
                this.totalScore++;
                document.cookie = 'score=' + this.totalScore;

                this.$socket.emit('score',{
                   score: this.totalScore
                });
            },
            getCookieValue(a)
            {
                let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
                return b ? b.pop() : '';
            },
            resetCookies()
            {
                this.showForm = true;
                this.formAnimation = '';
                document.cookie = "username=empty";
                document.cookie = "id=empty";
                document.cookie = "score=empty";
            }
        }
    }
</script>

<style scoped>

</style>