<template>
    <div>
        <score title="Total score:">
            <span slot="score">{{ this.totalScore }}</span>
        </score>
        <earth></earth>
    </div>
</template>

<script>
    import Score from '../components/score'
    import Earth from '../components/earth';
    export default {
        name: "earthPage",
        data(){
            return {
                totalScore: 0
            }
        },
        components:{
            Earth,
            Score
        },
        created(){
            this.setupBodyOptions();
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