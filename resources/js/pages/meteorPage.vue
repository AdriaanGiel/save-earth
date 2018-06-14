<template>
    <div>

        <name-form v-if="showForm" :class="formAnimation"></name-form>

        <div v-else>
            <score title="Hits">
                <span slot="score">{{ this.totalScore }}</span>
            </score>
            <meteor ></meteor>
        </div>


    </div>
</template>

<script>
    import score from '../components/score';
    import meteor from '../components/meteor';
    import form from '../components/nameForm';

    export default {
        name: "meteorPage",
        data:() => {
            return {
                username:false,
                formAnimation: '',
                showForm:true,
                totalScore:0
            }
        },
        components: {
            'score': score,
            'meteor': meteor,
            'name-form': form
        },
        created(){
            this.setupBodyOptions();
            this.checkCookie();

            this.$on('hit',this.addScore);

            this.$on('name-caught',() => {
              this.username = true;
              this.formAnimation = 'animated lightSpeedOut';

              setTimeout(() => {
                  this.showForm = false;
              },1500)
            });
        },
        methods: {
            checkCookie()
            {
                console.log(document.cookie.includes('username'));
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
            }
        }
    }
</script>

<style scoped>

</style>