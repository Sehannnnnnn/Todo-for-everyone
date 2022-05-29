import { removeTodos, updateTodos } from '@/plugins/firebaseDatabase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        user : {},
        todoItems: {},
    },
    getters : {
        getUser: state => {
            return state.user;
        },
        getTodos : state => {
            return state.todoItems;
        }
    },
    mutations : {
        setUser: (state, user) => {
            state.user = user;
        }, 
        fetchTodos: (state, todos) => {
            state.todoItems = todos;
        },
        clearUser : (state) => {
            state.user = {};
        },
        // addTodos: (state, value) => {
            
        // },
        removeTodos: (state, value) => {
            console.log('실행!')
            let todokey = "";
            Object.entries(state.todoItems).forEach(([key, todo]) => {
                if (value == todo) {
                    todokey = key;
                } 
            });
            //firebase remove;
            removeTodos(state.user.email, todokey);
        }, 
        clearAll : (state) => {
            state.todoItems = [];
            //firebase claer
        },
        completeTodo : (state, payload) => {
            let todokey = "";
            let value = payload.todo;
            Object.entries(state.todoItems).forEach(([key, todo]) => {
                if (value == todo) {
                    todokey = key;
                } 
            })
            value = {...value, isCompleted : payload.isCompleted};
            updateTodos(state.user.email, todokey, value);
        },
        updateTodos: (state, value) => {
            let todokey = "";
            Object.entries(state.todoItems).forEach(([key, todo]) => {
                if (value == todo) {
                    todokey = key;
                } 
            });
            //firebase update
            updateTodos(state.user.email, todokey, value);
        },
        
    }
})