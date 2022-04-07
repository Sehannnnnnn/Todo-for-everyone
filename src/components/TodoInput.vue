<template>
  <div class="inputBox shadow">
    <v-btn elevation="3" @click="showInputModal = true">Write Todo</v-btn>
    <v-divider></v-divider>
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
            :rules="rules" coutner="25" filled rounded v-on:keyup.enter="addTodo"></v-text-field>
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
      <v-btn elevation="2" slot="footer" @click="showInputModal = false">Back
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </v-btn>
      <v-btn elevation="2" slot="footer" @click="[showInputModal = false, addTodo()]">Save TODO
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

export default {
  data() {
    return {
      todoTitle: "",
      todoDetail: "",

      showModal: false,
      showInputModal : false,
    }
  },
  methods: {
    addTodo() {

      if (this.todoTitle !== "") {
        let todoObj = {
          sn : + new Date(),
          title : this.todoTitle && this.todoTitle.trim(),
          detail : this.todoDetail && this.todoDetail.trim(),
          isCompleted : false,
          isDeleted : false,
        };
				this.$emit('addTodo', todoObj)
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {

      this.todoTitle = '';
      this.todoDetail = '';
    },
  },
  components: {
    AlertModal,
    TodoInputModal,
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
</style>
