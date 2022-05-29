import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './route/index.js'
import {store} from './store/store.js';

Vue.config.productionTip = false
Vue.config.devtools = true
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAuC_NufeS_CaRPDfBCJXO7gxYi_n-C3U",
  authDomain: "todo-for-everyone-dd3d3.firebaseapp.com",
  projectId: "todo-for-everyone-dd3d3",
  databaseURL: "https://todo-for-everyone-dd3d3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "todo-for-everyone-dd3d3.appspot.com",
  messagingSenderId: "210301384706",
  appId: "1:210301384706:web:a596c011cdb6adf7814f1b"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);



new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
