import Vue from 'vue';
import VueRouter from 'vue-router';
import Uuid from 'uuid/v4';
import Config from '../../config';
import Touch from 'zingtouch';
import Timer from 'easytimer.js';

window.Vue = Vue;
window.VueRouter = VueRouter;
window.Uuid = Uuid;
window.Config = Config;
window.Touch = Touch;
window.Timer = Timer;

Vue.use(VueRouter);



