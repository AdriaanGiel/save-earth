<template>
    <img  class="feedback animated fadeOut" :src="this.getRandomSrc" alt="Feedback">
</template>

<script>
    export default {
        name: "feedback",
        props:{
          type:Boolean
        },
        data: () => {
            return{
                hitImages: [
                    'feedback-1.png',
                    'feedback-2.png',
                    'feedback-3.png',
                    'feedback-4.png'
                ],
                swipeImages: [
                    'woosh-1.png',
                    'woosh-2.png',
                    'woosh-3.png',
                    'woosh-4.png'

                ],

            }

        },
        computed: {
            getRandomSrc(){
               let src = this.hitImages[Math.floor(Math.random() * this.hitImages.length)];

                if(!this.type){
                    src = this.swipeImages[Math.floor(Math.random() * this.swipeImages.length)]
                }

               return "./img/" + src;
            }
        }
    }
</script>

<style scoped>

</style>