<template>
  <v-container fill-height fluid :style="{backgroundImage: createBackgroundString}">
      <v-row align-item="center" justify="center">
          <v-col>
            <v-avatar size="200">
                <v-img src="../../assets/favicon.png" max-height="200" max-width="200"/>
                </v-avatar>
                <h2>Todo For Everyone</h2>
          </v-col>
      </v-row>
      </v-container>
</template>

<script>
import logo from '../../assets/favicon.png'

export default {
    name : "TodoSplash",
    data() {
        return {
            angle: '70',
            color1: 'gray',
            color2: 'white'
        }
    },
    computed: {
        logo() {
            return logo;
        }, 
        createBackgroundString() {
            return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`
        }
    }
}
</script>

<style>
</style>