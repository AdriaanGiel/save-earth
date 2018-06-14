<template>
<div class="container form-row">
    <div class="row">
        <div class="columns twelve form-box">

            <h2 style="text-align: center">Voer je naam in</h2>

            <span style="color: indianred" v-if="checkName">Voer een naam in</span>

            <input class="u-full-width" type="text" v-model="userName" placeholder="Naam" id="username">

            <button @click="handleNameInput()" class="button-primary">Gaan</button>
        </div>
    </div>
</div>


</template>

<script>
    export default {
        name: "nameForm",
        data: () => {
            return {
                userName: '',
                checkName: false
            }
        },
        methods:{
            handleNameInput()
            {
                if(this.userName !== ''){
                    this.checkName = false;
                    document.cookie = "username=" + this.userName + ";";
                    this.$parent.$emit('name-caught');
                }else{
                    this.checkName = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>