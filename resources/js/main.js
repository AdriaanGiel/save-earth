import './bootstrap';
import MainPage from './pages/mainPage';


const app = new Vue({
    el:"#app",
    components:{
        'main-page': MainPage
    },
    methods:{}
});