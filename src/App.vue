<template>
<div>
<v-app v-if="!isLoaded">
  <TodoSplash />
</v-app>
<v-app v-else>
  <router-view>
    <TodoMain />
    <TodoLogin />
    <TodoCalender/>
  </router-view>
</v-app>
</div>
</template>

<script>
import TodoMain from "./components/TodoMain.vue";
import TodoLogin from "./components/TodoLogin.vue";
import TodoSplash from "./components/splash/TodoSplash.vue";
import TodoCalender from "./components/TodoCalendar.vue"

export default {
  name: "App",

  components: {
    TodoMain,
    TodoLogin,
    TodoSplash,
    TodoCalender,
  },
  data() {
    return {
      isLoaded : false
    }
  }, created() {
    this.splahsing();
  }, methods: {
    splahsing() {
      setTimeout(() => {
        this.isLoaded = true
      }, 2500)
    }
  }
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
.divider {
  margin-top: 15px;
}
</style>

