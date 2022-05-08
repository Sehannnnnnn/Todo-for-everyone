import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin';
import TodoMain from '../components/TodoMain';

const router = new VueRouter({
    mode: 'history',
    routes : [
        {path : '/', component: TodoMain},
        {path : '/login', component: TodoLogin},
    ]
});

export default router;