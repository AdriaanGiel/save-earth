<template>
    <div id="earth">

    </div>
</template>

<script>
    export default {
        name: "earth",
        mounted()
        {
            this.$el.addEventListener('webkitAnimationEnd',() => {
                console.log('ended animation')
            })
        }
    }

</script>

<style lang="stylus" scoped>

</style>