<template>
  <div>
          <v-container class="login_box">
              <v-row align="center" justify="center">
                <v-text-field label="E-mail" type="email" v-model="email"></v-text-field>
              </v-row>
              <v-row>
                  <v-text-field label="Password" type="password" v-model="pw"></v-text-field>
              </v-row>
              <v-row>
                  <v-btn @click="login">login</v-btn>
                  <v-btn @click="register">register</v-btn>
              </v-row>          
          </v-container>
  </div>
</template>

<script>
import {login, register} from '../util/firebaseAuth'

export default {
  data() {
    return {
      email : "",
      pw : ""
    }
  }, 
  methods: {
    login() {
      login(this.email, this.pw).then(
        this.$router.push({path : '/'})
      );
    },
    register() {
      register(this.email, this.pw);
    }
  },
  beforeCreate() {

  }
}
</script>

<style>
.login_box {
    padding: 10px;
}
</style>