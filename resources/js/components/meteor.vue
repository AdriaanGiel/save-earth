<template>
    <div id="meteor-box" class="flex flex-center">
        <img @click="showFeedback" :src="img_src" alt="Meteor">
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
                feedbackPosition: ''
            }
        },
        mounted() {
            let touch = new Touch.Region(this.$el);
            touch.bind(document.body, 'swipe', (e) => {
                console.log('swipe');
            }, false)
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