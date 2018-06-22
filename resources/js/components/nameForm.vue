<template>
<div class="container form-row">
    <div class="row">
        <div class="columns twelve form-box">

            <h2 style="text-align: center">Voer je naam in</h2>

            <span style="color: indianred" v-if="checkName">Voer een naam in</span>
            <span style="color: indianred" v-if="checkNameLength">Naam is te lang</span>

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
                checkName: false,
                checkNameLength:false
            }
        },
        methods:{
            handleNameInput()
            {
                if(this.userName !== ''){
                    this.checkName = false;
                    this.checkNameLength = false;
                    this.addNewPlayer();
                    this.$parent.$emit('name-caught');
                }else if(this.username.length >= 15)
                {
                    this.checkNameLength = true;
                } else{
                    this.checkName = true;
                }
            },
            addNewPlayer()
            {
                if(document.cookie !== 'undefined' || !this.getCookieValue('username') || this.getCookieValue('username') === 'empty'){
                    let id = Uuid();
                    document.cookie = "username=" + this.userName + ";";
                    document.cookie = "id="+ id +";";
                    document.cookie = "score=0";

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
            },
            cookieDate(d) {
                function d2(n) { return n < 10 ? '0' + n : n; }
                let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                return '' +
                    days[d.getUTCDay()] + ', ' +
                    d2(d.getUTCDate()) + '-' +
                    months[d.getUTCMonth()] + '-' +
                    d.getUTCFullYear() + ' ' +
                    d2(d.getUTCHours()) + ':' +
                    d2(d.getUTCMinutes()) + ':' +
                    d2(d.getUTCSeconds()) + ' GMT';
    }

        }
    }
</script>

<style scoped>

</style>