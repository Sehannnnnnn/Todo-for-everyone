<template>
<div>
  <v-container fluid>
  <v-row no-gutters>
    <v-col cols="3">
      <v-btn @click="logout">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn @click="nav_cal">
        <v-icon>
          mdi-calendar
        </v-icon>
  </v-btn>
    </v-col>
    <v-col cols="3">
       <v-btn @click="nav_cam">
         <v-icon>
          mdi-emoticon
        </v-icon>
       </v-btn>
    </v-col>
     <v-col cols="3">
       <v-btn @click="nav_home">
         <v-icon>
          mdi-home
        </v-icon>
       </v-btn>
    </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.removeItem('IsLogined');
        localStorage.removeItem('user');
      }).catch((err) => {
        console.log(err);
      });
    },
    nav_cal() {
      this.$router.push({path : '/calender'});
    },
    nav_home() {
      this.$router.push({path : '/'});
    }
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
