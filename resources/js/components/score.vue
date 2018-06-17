<template>
    <div>
        <h2 style="color: white; position: absolute; padding: 0 1em">{{ this.title }} <slot name="score"></slot></h2>
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