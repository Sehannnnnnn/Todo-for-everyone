<template>
     <v-container fill-height fluid :style="{backgroundImage: createBackgroundString}">
        <v-row align-item="center">
            <v-col>
              <v-avatar size="300">
                  <v-img src="../assets/favicon.png" max-height="250" max-width="250"/>
                  </v-avatar>
                  <h2>Todo For Everyone</h2>
            </v-col>
        </v-row>
        <v-row>
          <v-col>
              <v-text-field solo label="E-mail" type="email" v-model="email"></v-text-field>
              <v-text-field solo v-if="showNickname" label="nickname" type="text" v-model="nickname"></v-text-field>
                <v-text-field solo label="Password" type="password" v-model="pw"></v-text-field>
                <div v-if="!showNickname">
                <v-btn min-width="30vw" @click="login">로그인</v-btn>
                <v-btn min-width="30vw" @click="showNickname = true">회원가입</v-btn>    
                </div> 
                <div v-if="showNickname">
                <v-btn min-width="30vw" @click="showNickname = false">돌아가기</v-btn> 
                <v-btn min-width="30vw" @click="register">회원가입</v-btn> 
                </div> 
          </v-col>
      </v-row>
      </v-container>
</template>

<script>
import { loginUser, registerUser } from "../plugins/firebaseAuth"; 
import { pushUserInfo } from "../plugins/firebaseDatabase";

export default {
  data() {
    return {
      email : "",
      pw : "",
      nickname : "",
      showNickname : false,
      angle: '70',
      color1: 'gray',
      color2: 'white'
    }
  },
  computed : {
    createBackgroundString() {
            return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`
        },
  },
  methods: {
    login () {
      loginUser(this.email, this.pw, () => {
        setTimeout(() => {
          this.$router.push({path : '/'})
      }, 1000)
      });
      
    },
    register() {
      registerUser(this.email, this.pw);
      pushUserInfo(this.email, this.nickname);
    },
  }
}

</script>

<style>
</style>