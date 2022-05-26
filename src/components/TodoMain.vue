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
      </v-main>
      <v-footer>
    <TodoInput v-bind:propscategories="todoCategories"/>
      <TodoFooter v-on:removeAll="clearAll" v-bind:user="user"/>
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

export default {
    props: "",
    data() {
    return {
      todoCategories: ["All", "Today", "시험", "약속", "과제"],
      SelectedCategory : "All",
      todoFiltered : [],
      todoAll : [],
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
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
  watch: {
    todos(value) {
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
      this.todoFiltered = [];
      this.SelectedCategory = category;
      if (category !== "All") {
        for (let i  = 0; i < this.$store.state.todoItems.length; i++) {
          if (category == this.$store.state.todoItems[i].category) {
            this.todoFiltered.push(this.$store.state.todoItems[i])
            }
        }
      } else this.todoFiltered = this.$store.state.todoItems;
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
            console.log(this.$store);
          });
      this.todoAll = this.$store.state.todoItems;
      this.todoFiltered = this.todoAll;  
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
