<template>
  <div>
    <span>
        <v-btn @click="showInputModal = true">
          add new
          <v-icon
            dark
            right
          >
            mdi-pencil
          </v-icon>
        </v-btn>
      </span>

    <AlertModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </AlertModal>

    <TodoInputModal v-if="showInputModal" @close="showInuputModal=false">
    <h2 slot="header">TODO</h2>
        <v-form slot="bodyform">
          <v-container>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
            <v-text-field v-model="todoTitle" label="Todo title"
            counter="25" filled rounded v-on:keyup.enter="addTodo"></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
            <v-select
            :items="categories"
            placeholder="카테고리"
            v-model="todoCategory"
            label="Select todo category"></v-select>
            </v-col>
            <v-col
            cols="12"
            md="12">
            <DatePicker @setDate="setDate"></DatePicker>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="todoDetail"
                label="Todo details"
                hint="Write about details"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        </v-form>
      <v-btn elevation="2" slot="footer" @click="clearInput">Back
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </v-btn>
      <v-btn elevation="2" slot="footer" @click="addTodo">Save TODO
        <span class="addContainer">
        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
      </v-btn>
    </TodoInputModal>
  </div>
</template>

<script>
import AlertModal from './common/AlertModal.vue'
import TodoInputModal from './Modal/TodoInputModal.vue'
import DatePicker from './Modal/DatePicker.vue'
import { writeTodos, getTodos } from './../plugins/firebaseDatabase'

export default {
  props: ["propscategories"],
  data() {
    return {
      categories: [],
      todoTitle: "",
      todoDetail: "",
      todoCategory: "",
      todoDate: "",
      showModal: false,
      showInputModal: false,
    }
  },
  methods: {
    setDate(date) {
      this.todoDate = date;
      console.log(date);
    },
    addTodo() {
      this.showInputModal = false;
       if (this.todoTitle !== "") {
        let todoObj = {
          title : this.todoTitle && this.todoTitle.trim(),
          detail : this.todoDetail && this.todoDetail.trim(),
          category: this.todoCategory,
          date : this.todoDate,
          isCompleted : false,
          isDeleted : false,
        };
				writeTodos(this.$store.state.user.email, todoObj);
        getTodos(this.$store.state.user.email, (todos) => {
            this.$store.commit('fetchTodos', todos);
          });
        console.log(this.$store);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.showInputModal = false;
      this.todoTitle = "";
      this.todoDetail = "";
      this.todoCatgory = "";
      this.todoDate = "";
    },
  },
  created() {
      this.propscategories.map((ele) => {
        this.categories.push(ele.cate);
      })
  },
  components: {
    AlertModal,
    TodoInputModal,
    DatePicker,
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin:10px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: none;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}

.inputBtn {
  margin: 3px;
}

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
