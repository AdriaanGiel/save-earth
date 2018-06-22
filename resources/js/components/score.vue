<template>
    <div class="flex-fill text-center">
        <h2 class="player-feedback">{{ this.title }} <slot name="score"></slot></h2>
    </div>
</template>

<script>
    export default {
        name: "score",
        props:{
          title: String
        },
        data(){
            return {
                totalClicks:0
            }
        }
    }
</script>

<style scoped>

</style>