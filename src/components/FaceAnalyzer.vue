<template>
  <div>
      <v-container fluid class="fc">
          <v-row v-for="(value,index) in feelings" :key="index">
              <v-col cols="3" v-text="value.className">
              </v-col>
              <v-col cols="8">
                  <v-progress-linear height="20" :value="value.probability*100" :color="colorOf(value.className)"></v-progress-linear>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    props: ["feelings"],
    data () {
        return {
            feelings100 : [],
            color : {
                행복 : 'yellow',
                지루함 : 'grey',
                슬픔 : 'cyan',
                평온 : 'teal',
                화남 : 'orange',
            }
        }
    },
    methods: {
        mutiple100(prob) {
            return prob*100;
        },
        colorOf(name) {
            return this.color[name];
        },

    },
}
</script>

<style>
.fc {
    margin: 10px
}
</style>