<template>
<v-app>
<v-main>
  {{user.email}}
  <TodoHeader />
    <TodoCategory v-bind:propscategories="todoCategories" @selectTodo="selectTodo"/>
  <v-divider class="divider"></v-divider>
  <TodoList
        v-bind:propsdata="todoItems"
        :propscategories="todoCategories"
        @removeTodo="removeTodo"
        @completeTodo="completeTodo"
        @updateTodo="updateTodo"
      />
      </v-main>
      <v-footer>
    <TodoInput v-on:addTodo="addTodo" v-on:removeAll="clearAll" v-bind:propscategories="todoCategories"/>
      <TodoFooter v-on:removeAll="clearAll" />
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


export default {
    props: "",
    data() {
    return {
      todoItems: [],
      todoCategories: ["All", "Today", "시험", "약속", "과제"],
      SelectedCategory : "All",
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

  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    addTodo(todoObj) {
      localStorage.setItem(todoObj.sn, JSON.stringify(todoObj));
      this.todoItems.push(todoObj);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.sn);
      this.todoItems.splice(index, 1);
    },
    completeTodo(todoObj) {
      const item = JSON.parse(localStorage.getItem(todoObj.sn));
      todoObj.isCompleted = !todoObj.isCompleted;
      if (todoObj.isCompleted) {
        localStorage.setItem(todoObj.sn, JSON.stringify({...item, isCompleted: true}))
      } else {
        localStorage.setItem(todoObj.sn, JSON.stringify({...item, isCompleted: false}))
      }
    },
    updateTodo(todoObj) {
      const input = JSON.stringify(todoObj);
      localStorage.setItem(todoObj.sn, input);
    },
    selectTodo(category) {
      this.todoItems = [];
      this.SelectedCategory = category; 
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          } if (this.todoItems.length > 1) {
              const key = "sn";
              this.todoItems.sort(function (a,b) {return a[key] - b[key]})
          }
      if (category !== "All") {
          this.todoItems = this.todoItems.filter(function (todo) { return todo.category == category})
        } 
      }
  },
    created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      } if (this.todoItems.length > 1) {
          const key = "sn";
          this.todoItems.sort(function (a,b) {return a[key] - b[key]})
      }
    }
  }, 
  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user;
    } else {
        alert('로그인 이후 사용 가능합니다!')
        this.$router.push({path : '/login'});
    }
  })
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
