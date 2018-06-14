import './bootstrap';
import router from './router'

Vue.prototype.$socket = io('http://localhost:4000');

const app = new Vue({
    el:"#app",
    router: router,
    methods:{}
});