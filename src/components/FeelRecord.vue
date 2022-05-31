<template>
  <v-container class="FeelContainer">
      <h3>감정 기록</h3>
      <v-card class="mb-2 " v-for="(record, index) in records" :key="index">
          <v-list-item>
                <v-list-item-title v-text="record[5].DateTime" v-bind:class="{todoTitle: true}"></v-list-item-title>
                <v-list-item-group class="cate">
                        <v-row>
                        <v-chip v-text="record[0].className" :color="colorBy(record[0].className)"></v-chip>
                        </v-row>
                </v-list-item-group>
          </v-list-item>
      </v-card>
  </v-container>
</template>

<script>
export default {
    props: ["records"],
    data () {
        return {
             color : {
                행복 : 'yellow',
                지루함 : 'lightgrey',
                슬픔 : 'cyan',
                평온 : 'teal',
                화남 : 'orange',
            }
        }
    },
    methods: {
        colorBy(name) {
            return this.color[name];
        }
    },
}
</script>

<style>
.FeelContainer {
    margin-top: 20px;
    margin: 10px;
}
.todoTitle {
  font-size: 18px;
  padding : 8px;
  font-weight: bolder;
}
.cate {
  display: flex;
}
.cateChip {
  margin-right: 10px;
}
</style>