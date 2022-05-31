<template>
<v-app>
      <v-main>
        <todo-header />
        <v-container fluid>
        <v-row justify="center">
      <div id="cam"></div>
      <v-btn @click=startCam v-if="!camOn"> 오늘의 기분 </v-btn> 
      <div v-bind:style="{m : 10}">
        <v-btn @click=closeCam v-if="camOn"> 카메라 종료 </v-btn> 
        <v-btn v-if="camOn" @click=saveFeeling>
        기록하기
        <v-icon>
          mdi-camera
        </v-icon>
      </v-btn>
      </div> 
      </v-row>
      <span></span>
      <face-analyzer v-bind:feelings="message" v-if="camOn"/>
      <v-row align="center" justify="center">
      <feel-record v-bind:records="feelrecords"/>
      </v-row>
        </v-container>
    </v-main>
    <v-footer>
      <todo-footer />
    </v-footer>
</v-app>
</template>

<script>
import * as tmImage from '@teachablemachine/image';
import FaceAnalyzer from './FaceAnalyzer.vue';
import { getFeelings, pushFeelings } from '@/plugins/firebaseDatabase';
import TodoFooter from './TodoFooter.vue';
import FeelRecord from './FeelRecord.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserInfo } from "../plugins/firebaseDatabase";
import TodoHeader from './TodoHeader.vue';

export default {
  name: "App",

  components: {
    FaceAnalyzer,
    TodoFooter,
    FeelRecord,
    TodoHeader
  },
  data() {
    TodoFooter
    return {
      message: null,
      model: null,
      webcam: null,
      predicted: "", 
      camOn : false,
      feelrecords : {},
    } 
  }, methods: {
    async saveFeeling() {
      let record = this.message.concat([{DateTime : new Date().toLocaleString()}])
      await pushFeelings(this.$store.state.user.email, record, (email) => {
        getFeelings(email, (feelings) => {
        this.feelrecords = feelings;
      }) 
    });
      
    },
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);    
    },
    async predict() {
      // predict can take in an image, video or canvas html element
      let prediction = await this.model.predictTopK(
        this.webcam.canvas,
        5,
        true,
      );
      this.message = prediction;
    },
    
    async startCam() {
      this.webcam = new tmImage.Webcam(250, 250, true);
      await this.webcam.setup(); // request access to the webcam
      await this.webcam.play();
      document.getElementById("cam").appendChild(this.webcam.canvas);
      window.requestAnimationFrame(this.loop);
      this.camOn = true;
    },
    async closeCam() {
      await this.webcam.stop();
      document.getElementById("cam").removeChild(this.webcam.canvas);
      this.camOn = false;
    },
  },
  async mounted() {
    let baseURL = "https://teachablemachine.withgoogle.com/models/_jkIB8hLC/";
    this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json"
    );
    let maxPredictions = this.model.getTotalClasses();
    console.log(maxPredictions);
  }, created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserInfo(user.email, (userInfo) => {
          this.$store.commit('setUser', userInfo);
        });
        getFeelings(user.email, (feelings) => {
        this.feelrecords = feelings;
    }) 
    } else {
      //로그인이 안되있을때 
        this.$router.push({path : '/login'});
    }
  })
    
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.divider {
  margin-top: 15px;
}
</style>
