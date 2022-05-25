import { getTodos } from '@/plugins/firebaseDatabase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        user : {},
        todoItems: [
            {   
                sn : 1,
                title : "yeah",
                detail : "wow",
                category: "TODAY",
                isCompleted : true,
            }
        ]
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
        clearUser : (state) => {
            state.user = {};
        },
        addTodos: (state, value) => {
            state.todoItems.push(value);
            //firebase add
        },
        removeTodos: (state, payload) => {
            state.todoItems.splice(payload.index, 1);
            //firebase remove;
        }, 
        clearAll : (state) => {
            state.todoItems = [];
            //firebase claer
        },
        updataTodos: (state, payload) => {
            state.todoItems[payload.index] = payload.value;
            //firebase push
            //firebase get
        },
        fetchTodos: (state, payload) => {
            const todos = getTodos(payload.userEmail);
            state.todoItems = todos;
        }
    }
})