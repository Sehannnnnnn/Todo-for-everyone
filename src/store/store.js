import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        user : {},
        todoItems: []
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
        addTodos: (state, value) => {
            state.todoItems.push(value);
            //firebase add
        },
        removeTodos: (state, value) => {
            const index = state.todoItems.indexOf(value);
            state.todoItems.splice(index,1);
            //firebase remove;
        }, 
        clearAll : (state) => {
            state.todoItems = [];
            //firebase claer
        },
        completeTodo : (state, value) => {
            const index = state.todoItems.indexOf(value);
            state.todoItems[index].isCompleted = !state.todoItems[index].isCompleted
        },
        updateTodos: (state, value) => {
            const index = state.todoItems.indexOf(value);
            console.log(index);
            state.todoItems.splice(index, 1, value);
            //firebase push
            //firebase get
        },
        
    }
})