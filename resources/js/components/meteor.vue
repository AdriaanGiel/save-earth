<template>
    <div id="meteor-box" class="flex flex-center">
        <span style="color: white">{{this.swipeTest}}</span>
        <img id="meteor-img" :src="img_src" alt="Meteor">
        <feedback :type="true" :style="feedbackPosition" v-if="feedbackVisible"></feedback>
        <feedback :type="false" :style="swipeFeedbackPosition" v-if="swipeFeedbackVisible"></feedback>
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
                swipeFeedbackVisible: false,
                swipeFeedbackPosition: '',
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
                this.showSwipeFeedack(e);
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
            },
            showSwipeFeedack(e)
            {
                this.$parent.$emit('swipe');
                this.swipeFeedbackVisible = true;
                this.swipeFeedbackPosition = "left:" + e.x + this.random(-10,10) + "px; bottom:" + e.y + this.random(-10,10) + "px;";

                setTimeout(() => {
                    this.swipeFeedbackVisible = false;
                }, 200)
            },
            random(min,max)
            {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }
</script>

<style scoped>


</style>