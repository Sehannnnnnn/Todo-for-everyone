<template>
  <v-sheet
    class="mx-auto"
    max-width="700"
    height="30"
  >
    <v-slide-group
      multiple
      show-arrows
    >
      <v-slide-item
        v-for="category in propscategories"
        :key="category.cate"
        v-slot="{active, toggle}"
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          :color="category.color"
          @click="[toggle, selectCategory(category.cate)]"
        >
          {{category.cate}}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
    props: ["propscategories"],
    data() {
        return {
        }
    },
    methods: {
        selectCategory(category) {
          this.$emit("selectTodo", category);
        }
    },
}
</script>

<style>

</style>
