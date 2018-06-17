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
                    this.addNewPlayer();
                    this.$parent.$emit('name-caught');
                }else{
                    this.checkName = true;
                }
            },
            addNewPlayer()
            {
                if(!this.getCookieValue('username') || this.getCookieValue('username') === 'empty'){
                    let id = Uuid();

                    document.cookie = "username=" + this.userName + ";";
                    document.cookie = "id="+ id +";";
                    this.$socket.emit('add_player',{
                        id: id,
                        name: this.userName,
                        score: 0
                    });
                }
            },
            getCookieValue(a) {
                let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
                return b ? b.pop() : '';
            }
        }
    }
</script>

<style scoped>

</style>