import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin';
import TodoMain from '../components/TodoMain';
import TodoCalendar from '../components/TodoCalendar';
import TodoCamera from '../components/TodoCamera';

const router = new VueRouter({
    mode: 'history',
    routes : [
        {path : '/', component: TodoMain},
        {path : '/login', component: TodoLogin},
        {path : '/calender', component: TodoCalendar},
        {path : '/feelings', component: TodoCamera}
    ]
});

export default router;