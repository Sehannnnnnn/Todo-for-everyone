<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span>More</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <TodoHeader />
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList
        v-bind:propsdata="todoItems"
        @removeTodo="removeTodo"
        @completeTodo="completeTodo"
        @updateTodo="updateTodo"
      ></TodoList>
    </v-main>
    <v-footer color="primary">
      <TodoFooter v-on:removeAll="clearAll" />
    </v-footer>
  </v-app>
</template>

<script>
import TodoFooter from "./components/TodoFooter.vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";

export default {
  name: "App",

  components: {
    TodoList,
    TodoFooter,
    TodoHeader,
    TodoInput,
  },

  data() {
    return {
      todoItems: [],
    };
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
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

