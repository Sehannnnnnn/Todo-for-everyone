<template>
  <div>
          <v-container class="login_box">
              <v-row align="center" justify="center">
                <v-text-field label="E-mail"></v-text-field>
              </v-row>
              <v-row>
                  <v-text-field label="Password"></v-text-field>
              </v-row>
              <v-row>
                  <v-btn>login</v-btn>
              </v-row>          
          </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.login_box {
    padding: 10px;
}
</style>