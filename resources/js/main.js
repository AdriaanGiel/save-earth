import './bootstrap';
import router from './router'

if(Config.env === 'development'){
    Vue.prototype.$socket = io('http://localhost:4000');
}else{
    Vue.prototype.$socket = io();
}

const app = new Vue({
    el:"#app",
    history: true,
    router: router,
    methods:{}
});