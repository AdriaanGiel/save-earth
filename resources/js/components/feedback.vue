<template>
    <img class="feedback animated fadeOut" :src="this.getRandomSrc" alt="Feedback">
</template>

<script>
    export default {
        name: "feedback",
        data: () => {
            return{
                images: [
                    'feedback-1.png',
                    'feedback-2.png',
                    'feedback-3.png',
                    'feedback-4.png'
                ]
            }

        },
        computed: {
            getRandomSrc(){
               return "./img/" + this.images[Math.floor(Math.random() * this.images.length)];
            }
        }
    }
</script>

<style scoped>

</style>