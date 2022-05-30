<template>
<v-app>
<v-main>
    <TodoHeader />
    <TodoCategory v-bind:propscategories="todoCategories" @selectTodo="selectTodo"/>
    <v-divider class="divider"></v-divider>
    <TodoList
          v-bind:propsdata="todoFiltered"
          :propscategories="todoCategories"
        />
      <TodoInput v-bind:propscategories="todoCategories"/>
      </v-main>
    <v-footer>
      <center>
    <TodoFooter v-on:removeAll="clearAll" v-bind:user="user"/>
      </center>
    </v-footer>
    </v-app>
</template>

<script>
import TodoFooter from "../components/TodoFooter.vue";
import TodoHeader from "../components/TodoHeader.vue";
import TodoList from "../components/TodoList.vue";
import TodoInput from "../components/TodoInput.vue";
import TodoCategory from "../components/TodoCategory.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserInfo, getTodos } from "../plugins/firebaseDatabase";
import {mapGetters} from 'vuex';

export default {
    props: "",
    data() {
    return {
      todoCategories: [
        {cate: "All", color:""}, 
        {cate: "Today", color:'yellow'}, 
        {cate: "학교", color : 'cyan lighten-2'}, 
        {cate: "약속", color : 'teal lighten-4'}, 
        {cate: "일", color: 'orange'}
        ],
      SelectedCategory : "All",
      todoFiltered : [],
      temp : [],
      todoAll : {},
      user : {},
    };
  },
  components: {
    TodoList,
    TodoFooter,
    TodoHeader,
    TodoInput,
    TodoCategory,
  },
   computed: mapGetters({
    todos : 'getTodos'
  }),
  watch: {
    todos(value) {
      console.log(value);
      this.todoAll = value;
      this.selectTodo(this.SelectedCategory);
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    selectTodo(category) {
      if (category !== "All") {
        this.todoFiltered = Object.values(this.todoAll)
        .filter(function(todo) {return todo.category == category})
      } else this.todoFiltered = Object.values(this.todoAll);
      },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserInfo(user.email, (userInfo) => {
          this.$store.commit('setUser', userInfo);
        });
        getTodos(user.email, (todos) => {
            this.$store.commit('fetchTodos', todos);
          });
      this.todoAll = this.$store.state.todoItems;
      this.todoFiltered = Object.values(this.todoAll);  
    } else {
      //로그인이 안되있을때 
        this.$router.push({path : '/login'});
    }
  })
  }, 
  beforeCreate() {
  }
}

</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.divider {
  margin-top: 15px;
}
</style>
