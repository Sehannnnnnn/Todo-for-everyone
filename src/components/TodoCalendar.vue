<template>
  <v-app>
    <TodoHeader />
    <v-main>
      <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer>
      </v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
  </v-main>
  <v-footer>
    <TodoFooter />
  </v-footer>
  </v-app>
   
</template>

<script>
import TodoHeader from "../components/TodoHeader.vue";
import TodoFooter from "../components/TodoFooter.vue";
import {mapGetters} from 'vuex';

export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      value: '',
      events: [],
      colors: {
        All : 'grey',
        Today : 'yellow',
        학교 : 'cyan lighten-2',
        약속 : 'teal lighten-4',
        일 : 'orange',
      }
    }),
  components: {
    TodoHeader,
    TodoFooter
  },
  computed: mapGetters({
    todos : 'getTodos'
  }),
  methods: {
    getEvents () {
      const events = [];
      const todos = this.$store.state.todoItems;
      console.log(todos);
      Object.values(todos).forEach((todo) => {
        const year = todo.date.substring(0,4);
        const month = todo.date.substring(5,7);
        const day = todo.date.substring(8,10);
        events.push({
          name: todo.title,
          start: new Date(year, month-1, day),
          end : new Date(year, month-1, day),
          color: this.colors[todo.category],
        })
      })
      this.events = events;
    },
    getEventColor (event) {
      return event.color;
    }
  }
}
</script>

<style>

</style>