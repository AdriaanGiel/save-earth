<template>
    <div id="meteor-box" class="flex flex-center">
        <img @click="showFeedback" :src="img_src" alt="Meteor">
    </div>
</template>

<script>
    export default {
        name: "meteor",
        data: () => {
            return {
                img_src: './img/meteor.gif'
            }
        },
        methods:{
            showFeedback(e)
            {
                let feedback = document.createElement('img');
                let box = document.getElementById('meteor-box');
                feedback.src = '';
                feedback.style.width = '50px';
                feedback.style.height = '50px';
                feedback.style.position = 'absolute';
                feedback.classList.add('animated');
                feedback.classList.add('fadeOut');

                feedback.style.transform = "translate("+e.x+"px, "+ e.y+"px)";

                box.appendChild(feedback);
            }
        }
    }
</script>

<style scoped>



</style>