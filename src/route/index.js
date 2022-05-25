import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin';
import TodoMain from '../components/TodoMain';
import TodoCalendar from '../components/TodoCalendar';

const router = new VueRouter({
    mode: 'history',
    routes : [
        {path : '/', component: TodoMain},
        {path : '/login', component: TodoLogin},
        {path : '/calender', component: TodoCalendar}
    ]
});

export default router;