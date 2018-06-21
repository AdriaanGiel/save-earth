<template>
    <div id="meteor-box" class="flex flex-center">
        <span style="color: white">{{this.swipeTest}}</span>
        <img id="meteor-img" @click="showFeedback" :src="img_src" alt="Meteor">
        <feedback :style="feedbackPosition" v-if="feedbackVisible"></feedback>
    </div>
</template>

<script>
    import feedback from './feedback';

    export default {
        name: "meteor",
        data: () => {
            return {
                img_src: './img/meteor.gif',
                feedbackVisible: false,
                feedbackPosition: '',
                swipeTest:0
            }
        },
        mounted() {
            let touch = new Touch.Region(document.body);
            let met = document.getElementById('meteor-img');
            touch.bind(met, 'tap', (e) => {
                this.showFeedback(e);
            });

            touch.bind(met, 'swipe', (e) => {

                this.showFeedback(e)
                this.swipeTest++;
            });
        },
        components: {
            feedback
        },
        methods: {
            showFeedback(e) {
                this.$parent.$emit('hit');
                this.feedbackVisible = true;
                this.feedbackPosition = "left:" + e.x + "px; bottom:" + e.y + "px;";

                setTimeout(() => {
                    this.feedbackVisible = false;
                }, 200)
            }
        }
    }
</script>

<style scoped>


</style>