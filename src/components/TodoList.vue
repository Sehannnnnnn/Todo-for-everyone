<template>
  <v-container>
    <transition-group class="pl-0" name="list" tag="ul">
      <v-card class="mb-2 " v-for="(todoItem, index) in propsdata" :key="index">
        <v-card-actions>
          <v-list-item>
            <v-list-item-content @click="showDetailModal(todoItem)">
              <v-list-item-group class="cate">
                <v-chip class="cateChip" v-text="todoItem.category" color="yellow">
                </v-chip>
                <v-chip class="dateChip" v-text="todoItem.date"></v-chip>
              </v-list-item-group>
              <v-list-item-title v-text="todoItem.title" v-bind:class="{todoTitle: true}"></v-list-item-title>
              <v-list-item-content v-text="todoItem.detail" v-bind:class="{todoDetail: true}"></v-list-item-content>
              </v-list-item-content>
            <v-btn icon color="green" @click="completeTodo(todoItem)" v-bind:style="{ backgroundColor : todoItem.isCompleted ? 'lightgreen' : '' }">
              <v-icon> mdi-check </v-icon>
            </v-btn>
            <v-btn icon small color="red" @click="removeTodo(todoItem)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </transition-group>

  <TodoDetailModal v-if="showModal" @close="showModal=false">
    <h2 slot="header">TODO</h2>
        <v-form slot="bodyform">
          <v-container>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
            <v-text-field v-model="Todo.title" placeholder="Type what you have to do" counter="25" filled rounded v-on:keyup.enter="addTodo"></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
            <v-select
            :items="propscategories"
            v-model="Todo.category"
            label="Select todo category"></v-select>
            </v-col>
            <v-col
            cols="12"
            md="12">
            <DatePicker @setDate="setDate" @value="Todo.date"></DatePicker>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="Todo.detail"
                label="Todo details"
                hint="Write about details"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        </v-form>
      <v-btn elevation="2" slot="footer" @click="showModal = false">Back
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </v-btn>
      <v-btn elevation="2" slot="footer" @click="[showModal = false, updateTodo()]">Save Changes
        <span class="addContainer">
        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
      </v-btn>
  </TodoDetailModal>
  </v-container>
</template>
<script>
import TodoDetailModal from './Modal/TodoDetailModal.vue';
import DatePicker from './Modal/DatePicker.vue'
import {mapGetters} from 'vuex';

export default {
  props: ['propsdata', 'propscategories'],
  data() {
    return {
      showModal : false,
      Todo: {
        title : "",
        detail : "",
        date : "",
        category : "",
        isCompleted : "",
      },
    }
  },
  components: {
    TodoDetailModal,
    DatePicker
  },
  computed: mapGetters({
    todos : 'getTodos'
  }),
  methods: {
    removeTodo(todoItem) {
      this.$store.commit('removeTodos', todoItem);
      console.log(this.todos)
      console.log(this.propsdata);
    },
    updateTodo() {
      this.$store.commit('updateTodos', this.Todo);
      console.log(this.$store);
    },
    completeTodo(todoItem) {
      this.$store.commit("completeTodo", todoItem);
      console.log(this.$store);
    },
    showDetailModal(todoItem) {
      console.log(todoItem);
      console.log(this.propscategories);
      this.Todo = todoItem;
      this.showModal=true;
    },
    setDate(date) {
      this.Todo.date = date[0];
    },
  },
};
</script>
<style scoped>

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.todoTitle {
  font-size: 18px;
  padding : 8px;
  font-weight: bolder;
}

.todoDetail {
  font-size: 15px;
  padding: 8px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.cate {
  display: flex;
  padding-bottom: 10px;
}
.cateChip {
  margin-right: 10px;
}
.dateChip {
  margin-right: 10px;
}
.hover {
  font-size: 10;
}
</style>
